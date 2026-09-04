const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../site/script.js'), 'utf8');
const code = source.slice(source.indexOf('const warmedImages'), source.indexOf('function warmMapAssets'));
const images = [];
const c = vm.createContext({ navigator: { connection: { saveData: false } },
  setTimeout: () => 1, clearTimeout() {},
  Image: class { constructor() { images.push(this); } }
});
vm.runInContext(code, c);
vm.runInContext("warmImages(['a.webp','b.webp','c.webp','a.webp',null])", c);
assert.equal(images.length, 2);
assert.equal(images[0].fetchPriority, 'low');
images[0].onload();
assert.equal(images.length, 3);
assert.equal(images[2].src, 'c.webp');
images[1].onerror();
images[2].onload();
vm.runInContext("warmImages(['a.webp','b.webp'])", c);
assert.equal(images.length, 4, 'Only the failed image should retry');
images[3].onload();
vm.runInContext("navigator.connection.saveData=true; warmImages(['d.webp'])", c);
assert.equal(images.length, 4);
assert.equal(vm.runInContext('imageWarmActive', c), 0);
console.log('PASS — two concurrent low-priority image loads, deduplication, failure retry and data-saver opt-out.');
