const http = require('http');
const fs = require('fs');
const { execSync, spawn } = require('child_process');

const html = fs.readFileSync('/workspace/french-tutor/lesson-slides.html');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
});

server.listen(4040, '127.0.0.1', () => {
  console.log('Server on 4040');
  // Start ngrok
  const ngrok = spawn('/workspace/french-tutor/ngrok', ['http', '4040', '--log', 'stdout'], {
    stdio: ['ignore', 'pipe', 'pipe']
  });
  ngrok.stdout.on('data', d => {
    const line = d.toString();
    const match = line.match(/url=(https:\/\/[^\s]+)/);
    if(match) console.log('PUBLIC_URL=' + match[1]);
  });
  ngrok.stderr.on('data', d => console.error(d.toString()));
});
