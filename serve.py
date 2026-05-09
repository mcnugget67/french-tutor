import http.server
import socketserver

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='/workspace/french-tutor', **kwargs)

with socketserver.TCPServer(('0.0.0.0', 3000), Handler) as httpd:
    print('Serving on port 3000', flush=True)
    httpd.serve_forever()
