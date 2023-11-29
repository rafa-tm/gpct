import { createRoot } from 'react-dom/client';
import ViewGPCT from '@root/src/pages/content/components/MeetPanel/ViewGPCT';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { attachTwindStyle } from '@src/shared/style/twind';

refreshOnUpdate('pages/content');

function waitUntilJoinCall() {
  return new Promise(resolve => {
    const observer = new MutationObserver(changes => {
      for (const change of changes) {
        if (change.target.classList.contains('google-material-icons')) {
          for (const node of change.addedNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.data === 'call_end') {
              observer.disconnect();
              return resolve();
            }
          }
        }
      }
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  });
}

function createPanelElement() {
  const root = document.createElement('div');
  root.id = 'GPCT-PANEL-ROOT';
  root.style.width = '40%';
  root.style.height = '85%';
  root.style.position = 'absolute';

  const savedPosition = localStorage.getItem('panelPosition');
  if (savedPosition) {
    const { left, top } = JSON.parse(savedPosition);
    root.style.left = left;
    root.style.top = top;
  } else {
    root.style.left = '16px';
    root.style.top = '16px';
  }
  root.style.zIndex = '10000';
  root.style.borderRadius = '4px';
  root.style.boxShadow = '0 0 16px rgba(0,0,0,0.5)';
  root.style.backgroundColor = '#fff';
  root.style.overflow = 'scroll';
  document.body.appendChild(root);
  return root;
}

function makeDraggable() {
  const panelRoot = document.getElementById('GPCT-PANEL-ROOT');
  let isDragging = false;
  let offsetX, offsetY;

  panelRoot.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - panelRoot.getBoundingClientRect().left;
    offsetY = e.clientY - panelRoot.getBoundingClientRect().top;
    panelRoot.style.transition = 'none';
    panelRoot.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', e => {
    if (isDragging) {
      const left = e.clientX - offsetX;
      const top = e.clientY - offsetY;
      panelRoot.style.left = left + 'px';
      panelRoot.style.top = top + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      panelRoot.style.transition = '0.3s';
      panelRoot.style.cursor = 'grab';
      localStorage.setItem(
        'panelPosition',
        JSON.stringify({
          left: panelRoot.style.left,
          top: panelRoot.style.top,
        }),
      );
    }
  });
}

(async () => {
  await waitUntilJoinCall();
  const panel = createPanelElement();
  attachTwindStyle(panel, document);
  createRoot(panel).render(<ViewGPCT />);
  makeDraggable();
})();
