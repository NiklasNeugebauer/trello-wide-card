// Fallback for the stylesheet: Trello occasionally sets the dialog width
// inline or on an element without a stable hook. Walk up from the card-back
// node to the dialog container and pin the width there.

const WIDTH = '90vw';

function widen() {
  const name = document.querySelector('div[data-testid="card-back-name"]');
  if (!name) return;
  const targets = new Set([name]);
  const dialog = name.closest('[role="dialog"]');
  if (dialog) targets.add(dialog);
  const layer = document.getElementById('layer-manager-card-back');
  if (layer) {
    for (const el of layer.querySelectorAll(':scope > div > div')) targets.add(el);
  }
  for (const el of targets) {
    if (el.style.getPropertyValue('width') !== WIDTH) {
      el.style.setProperty('width', WIDTH, 'important');
      el.style.setProperty('max-width', WIDTH, 'important');
    }
  }
}

const observer = new MutationObserver(() => {
  if (document.getElementById('layer-manager-card-back')) widen();
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
