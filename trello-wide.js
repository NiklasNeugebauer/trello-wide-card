// Trello's card back has no stable hook on the element that carries the width,
// so find it by geometry: the outermost ancestor of the card content that is
// narrower than the viewport is the dialog box. Pin that one, then loosen any
// pixel max-width inside it that would keep the content from filling the box.

const WIDTH = '90vw';
const INNER_SCAN_DEPTH = 6;

let widenedBox = null;

function pin(el) {
  el.style.setProperty('width', WIDTH, 'important');
  el.style.setProperty('max-width', WIDTH, 'important');
  el.style.setProperty('margin-left', 'auto', 'important');
  el.style.setProperty('margin-right', 'auto', 'important');
}

function loosen(el, boxWidth, depth) {
  if (depth > INNER_SCAN_DEPTH) return;
  for (const child of el.children) {
    const max = parseFloat(getComputedStyle(child).maxWidth);
    if (!Number.isNaN(max) && max < boxWidth) {
      child.style.setProperty('max-width', 'none', 'important');
    }
    loosen(child, boxWidth, depth + 1);
  }
}

function widen() {
  const layer = document.getElementById('layer-manager-card-back');
  const name = layer && layer.querySelector('div[data-testid="card-back-name"]');
  if (!name) {
    widenedBox = null;
    return;
  }
  const vw = document.documentElement.clientWidth;
  let box = null;
  for (let el = name; el && el !== layer; el = el.parentElement) {
    if (el.getBoundingClientRect().width < vw * 0.95) box = el;
  }
  if (!box || box === widenedBox) return;
  widenedBox = box;
  pin(box);
  requestAnimationFrame(() => loosen(box, box.getBoundingClientRect().width, 0));
}

const observer = new MutationObserver(widen);

function start() {
  observer.observe(document.documentElement, { childList: true, subtree: true });
  widen();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
