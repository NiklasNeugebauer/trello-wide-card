// Trello's card back has no stable hook on the element that carries the width,
// so find it by geometry: the outermost ancestor of the card's main column that
// is narrower than the viewport is the dialog box. Pin that box to WIDTH and
// centre it, and let the wrappers between box and main column size to it.

const WIDTH = '90vw';
const MARK = 'data-trello-wide-card';

function pin(box) {
  const s = box.style;
  s.setProperty('width', WIDTH, 'important');
  s.setProperty('max-width', WIDTH, 'important');
  s.setProperty('margin-left', 'auto', 'important');
  s.setProperty('margin-right', 'auto', 'important');
  const position = getComputedStyle(box).position;
  if (position === 'absolute' || position === 'fixed') {
    s.setProperty('left', '0', 'important');
    s.setProperty('right', '0', 'important');
    s.setProperty('transform', 'none', 'important');
  }
}

function widen() {
  const layer = document.getElementById('layer-manager-card-back');
  const main = layer && layer.querySelector('main[data-auto-scrollable]');
  if (!main || main.hasAttribute(MARK)) return;
  const vw = document.documentElement.clientWidth;
  const chain = [];
  let box = null;
  for (let el = main; el && el !== layer; el = el.parentElement) {
    chain.push(el);
    if (el.getBoundingClientRect().width < vw * 0.95) box = el;
  }
  if (!box) return;
  main.setAttribute(MARK, '');
  pin(box);
  for (const el of chain) {
    if (el === box) break;
    el.style.setProperty('width', 'auto', 'important');
    el.style.setProperty('max-width', 'none', 'important');
  }
  main.style.setProperty('flex', '1 1 auto', 'important');
  main.style.setProperty('max-width', 'none', 'important');
}

let scheduled = false;
const observer = new MutationObserver(() => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    widen();
  });
});

function start() {
  observer.observe(document.documentElement, { childList: true, subtree: true });
  widen();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
