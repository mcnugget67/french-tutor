const http = require('http');
const fs = require('fs');
const file = fs.readFileSync('/workspace/french-tutor/lesson-slides.html');
const s = http.createServer((req, res) => {
  console.log(new Date().toISOString(), req.method, req.url);
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(file);
});
s.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
