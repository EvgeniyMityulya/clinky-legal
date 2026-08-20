#!/usr/bin/env python3
"""Local preview that mimics GitHub Pages: pretty URLs, directory indexes, 404.html."""
import functools
import http.server
import os
import socketserver
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765


class PagesHandler(http.server.SimpleHTTPRequestHandler):
    def resolve(self, path):
        rel = path.split('?')[0].split('#')[0].lstrip('/')
        candidates = [rel, f'{rel}/index.html', f'{rel}.html'] if rel else ['index.html']
        for candidate in candidates:
            full = os.path.join(ROOT, candidate)
            if os.path.isfile(full):
                return candidate
        return None

    def do_GET(self):
        target = self.resolve(self.path)
        if target is None:
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            with open(os.path.join(ROOT, '404.html'), 'rb') as fh:
                body = fh.read()
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        self.path = '/' + target
        super().do_GET()

    def log_message(self, fmt, *args):
        sys.stderr.write('%s %s\n' % (self.address_string(), fmt % args))


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == '__main__':
    handler = functools.partial(PagesHandler, directory=ROOT)
    with Server(('127.0.0.1', PORT), handler) as httpd:
        print(f'Clinky preview on http://localhost:{PORT}  (Ctrl+C to stop)')
        httpd.serve_forever()
