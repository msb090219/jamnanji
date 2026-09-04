// Dependency-free delivery build. Originals stay in the repository, not the site artifact.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'site');
const output = path.join(root, 'dist-pages');
// Require a clean destination rather than deleting an existing directory.
if (fs.existsSync(output)) throw Error('dist-pages already exists. Move it aside before rebuilding.');
const allowed = new Set(['.html', '.css', '.js', '.webp', '.svg', '.woff2', '.ico']);
let count = 0, bytes = 0;
function copy(directory, relative = '') {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw Error('Symlinks are not allowed in the Pages artifact');
    const name = path.join(relative, entry.name);
    if (entry.isDirectory()) copy(path.join(directory, entry.name), name);
    else if (allowed.has(path.extname(entry.name)) || entry.name === 'CNAME') {
      const target = path.join(output, name);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      const data = fs.readFileSync(path.join(source, name));
      fs.writeFileSync(target, data);
      count++; bytes += data.length;
    }
  }
}
copy(source);
const index = path.join(output, 'index.html');
fs.writeFileSync(index, fs.readFileSync(index, 'utf8').replace(/((?:src|href)=")([^"?]+\.(?:js|css))(?:\?[^" ]*)?"/g, (_, attr, file) => {
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(output, file))).digest('hex').slice(0, 12);
  return `${attr}${file}?v=${hash}"`;
}));
fs.writeFileSync(path.join(output, '.nojekyll'), '');
console.log(`Pages artifact: ${count} files, ${(bytes / 1e6).toFixed(2)} MB. Source PNGs and TTFs excluded.`);
