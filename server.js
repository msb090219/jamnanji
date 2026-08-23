const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'site');
const port = process.env.PORT || 4173;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png' };

http.createServer((request, response) => {
  const requestPath = request.url.split('?')[0];
  const filePath = path.resolve(root, `.${decodeURIComponent(requestPath === '/' ? '/index.html' : requestPath)}`);

  if (!filePath.startsWith(root)) {
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
  console.log(`Jamnanji is running at http://127.0.0.1:${port}`);
});
