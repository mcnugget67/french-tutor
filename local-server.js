const http = require('http');
const fs = require('fs');
const html = fs.readFileSync('/workspace/french-tutor/lesson-slides.html');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
}).listen(4040, '127.0.0.1', () => console.log('READY on 4040'));
