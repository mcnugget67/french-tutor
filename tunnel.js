const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

const html = fs.readFileSync('/workspace/french-tutor/lesson-slides.html');

const server = http.createServer((req, res) => {
  console.log(new Date().toISOString(), req.method, req.url);
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Server ready on 8080');
  
  // Start bore tunnel
  const bore = spawn('/workspace/french-tutor/bore', ['local', '8080', '--to', 'bore.pub'], {
    stdio: ['ignore', 'pipe', 'pipe']
  });
  
  bore.stdout.on('data', d => {
    const line = d.toString().trim();
    console.log('bore: ' + line);
  });
  
  bore.stderr.on('data', d => {
    const line = d.toString().trim();
    console.log('bore: ' + line);
  });
  
  bore.on('exit', (code) => {
    console.log('bore exited with code ' + code);
  });
});

process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));
