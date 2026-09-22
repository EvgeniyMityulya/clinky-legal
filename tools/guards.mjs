// Build-time checks for anything that reaches the pages from a content file or a download.
// Every check throws, so a bad value stops the build instead of shipping.

// https: or root-relative only, and none of the characters that could leave an HTML
// attribute or a quoted JS string. Real URLs percent-encode all of them anyway.
const SAFE_URL = /^(?:https:\/\/[^/\\\s]|\/(?![/\\]))[^\s\\'"<>`\x00-\x1f\x7f]*$/;

export function assertSafeUrl(url) {
  const s = String(url);
  if (!SAFE_URL.test(s)) throw new Error(`refusing URL ${JSON.stringify(s)}: only https: or root-relative links pass`);
  return s;
}

// Icon markup is inlined into the page, so only plain geometry may pass: no scripts, event
// handlers, links, <use>, foreign content or styles that could fetch something.
const SVG_ELEMENTS = new Set(['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'g']);
const SVG_ATTRIBUTES = new Set([
  'd', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry', 'width', 'height', 'points', 'pathLength', 'transform',
  'fill', 'fill-rule', 'fill-opacity', 'clip-rule', 'opacity',
  'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit',
  'stroke-dasharray', 'stroke-dashoffset', 'stroke-opacity'
]);
const TAG = /<(\/?)([A-Za-z][\w:.-]*)((?:\s+[^\s="'<>\/]+="[^"]*")*)\s*(\/?)>/y;
const ATTR = /\s+([^\s="'<>\/]+)="([^"]*)"/g;

export function assertGeometricSvg(markup, label) {
  const fail = (why) => { throw new Error(`${label}: ${why}`); };
  let i = 0;
  while (i < markup.length) {
    if (/\s/.test(markup[i])) { i++; continue; }
    TAG.lastIndex = i;
    const m = TAG.exec(markup);
    if (!m) fail(`unexpected markup ${JSON.stringify(markup.slice(i, i + 40))}`);
    const [, closing, name, attrs, selfClosing] = m;
    if (!SVG_ELEMENTS.has(name)) fail(`<${name}> is not allowed`);
    if (closing && (attrs || selfClosing)) fail(`malformed </${name}>`);
    for (const [, attr, value] of attrs.matchAll(ATTR)) {
      if (!SVG_ATTRIBUTES.has(attr)) fail(`attribute ${attr} on <${name}> is not allowed`);
      if (/[<>&]|url\s*\(|script:/i.test(value)) fail(`attribute ${attr} on <${name}> carries ${JSON.stringify(value)}`);
    }
    i = TAG.lastIndex;
  }
  return markup;
}

// Brand marks ship as a bare path string that site.js wraps in <path d="...">.
export function assertPathData(d, label) {
  if (typeof d !== 'string' || !/^[MmZzLlHhVvCcSsQqTtAa0-9eE.,\s+-]+$/.test(d)) throw new Error(`${label}: not plain SVG path data`);
  return d;
}
