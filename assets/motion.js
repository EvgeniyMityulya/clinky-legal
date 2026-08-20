/* Clinky motion: smooth <details> accordion for FAQ blocks rendered by site.js. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
  var EASE_IN = 'cubic-bezier(0.7, 0, 0.84, 0)';

  function open(details, body) {
    details.open = true;
    if (reduced.matches || !body.animate) return;
    var end = body.scrollHeight;
    body.style.overflow = 'hidden';
    var anim = body.animate(
      [{ height: '0px', opacity: 0 }, { height: end + 'px', opacity: 1 }],
      { duration: 320, easing: EASE_OUT }
    );
    anim.onfinish = anim.oncancel = function () { body.style.overflow = ''; };
  }

  function close(details, body) {
    if (reduced.matches || !body.animate) { details.open = false; return; }
    body.style.overflow = 'hidden';
    var anim = body.animate(
      [{ height: body.scrollHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
      { duration: 220, easing: EASE_IN }
    );
    anim.onfinish = function () { details.open = false; body.style.overflow = ''; };
  }

  document.addEventListener('click', function (e) {
    var summary = e.target.closest ? e.target.closest('.faq-acc summary') : null;
    if (!summary) return;
    var details = summary.parentElement;
    var body = details.querySelector('.faq-body');
    if (!body) return;
    e.preventDefault();
    if (details.open) close(details, body); else open(details, body);
  });

  window.clinkyInitReveals = function () {};
})();
