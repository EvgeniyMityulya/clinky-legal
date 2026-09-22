#!/usr/bin/env python3
"""Local preview that mimics GitHub Pages: pretty URLs, directory indexes, 404.html."""
import functools
import http.server
import os
import socketserver
import sys
import urllib.parse

ROOT = os.path.realpath(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
# The preview serves the whole repo, tools and all, so it never listens beyond this machine.
HOST = '127.0.0.1'

# A request line is attacker-controlled; raw control characters in it could drive the terminal.
LOG_ESCAPES = {c: '\\x%02x' % c for c in list(range(0x20)) + list(range(0x7f, 0xa0))}


def inside_root(full):
    return full == ROOT or full.startswith(ROOT + os.sep)


class PagesHandler(http.server.SimpleHTTPRequestHandler):
    def resolve(self, path):
        """Map a request path to a file under ROOT, or None for a 404."""
        try:
            rel = urllib.parse.unquote(path.split('?', 1)[0].split('#', 1)[0], errors='strict')
        except UnicodeDecodeError:
            return None
        parts = [p for p in rel.split('/') if p]
        # '..' would climb out of the repo; dot-prefixed names are .git, .claude, .env and friends
        if any(p.startswith('.') or '\\' in p or '\0' in p for p in parts):
            return None
        rel = '/'.join(parts)
        candidates = [rel, f'{rel}/index.html', f'{rel}.html'] if rel else ['index.html']
        for candidate in candidates:
            full = os.path.realpath(os.path.join(ROOT, candidate))
            if not inside_root(full) or not os.path.isfile(full):
                continue
            target = os.path.relpath(full, ROOT)
            # a symlink could still land on a dot-prefixed path inside the repo
            if any(p.startswith('.') for p in target.split(os.sep)):
                continue
            return target
        return None

    def serve(self, head):
        target = self.resolve(self.path)
        if target is None:
            with open(os.path.join(ROOT, '404.html'), 'rb') as fh:
                body = fh.read()
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            if not head:
                self.wfile.write(body)
            return
        self.path = '/' + urllib.parse.quote(target.replace(os.sep, '/'))
        if head:
            super().do_HEAD()
        else:
            super().do_GET()

    def do_GET(self):
        self.serve(head=False)

    def do_HEAD(self):
        self.serve(head=True)

    def log_message(self, fmt, *args):
        sys.stderr.write('%s %s\n' % (self.address_string(), (fmt % args).translate(LOG_ESCAPES)))


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True
    # The home page opens ~30 connections at once (HTTP/1.0); the default backlog of 5 resets some.
    request_queue_size = 64


if __name__ == '__main__':
    handler = functools.partial(PagesHandler, directory=ROOT)
    with Server((HOST, PORT), handler) as httpd:
        print(f'Clinky preview on http://localhost:{PORT}  (Ctrl+C to stop)')
        httpd.serve_forever()
