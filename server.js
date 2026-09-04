const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'site');
const port = process.env.PORT || 4173;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff2': 'font/woff2' };

const server = http.createServer((request, response) => {
  const requestPath = request.url.split('?')[0];
  let decoded;
  try { decoded = decodeURIComponent(requestPath === '/' ? '/index.html' : requestPath); }
  catch { response.writeHead(400).end('Bad request'); return; }
  if (decoded.includes('\0')) { response.writeHead(400).end('Bad request'); return; }
  const filePath = path.resolve(root, `.${decoded}`);

  if (!filePath.startsWith(root + path.sep)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404).end('Not found');
      return;
    }
    response.writeHead(200, {
      'Content-Type': types[path.extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    response.end(data);
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`Jamnanji is running at http://127.0.0.1:${server.address().port}`);
});
