import React from 'react';
import { createRoot } from 'react-dom/client';
import PanelRoutes from '@pages/content/components/MeetPanel/PanelRoutes';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { attachTwindStyle } from '@src/shared/style/twind';
import { Rnd } from 'react-rnd';

refreshOnUpdate('pages/content');

function waitUntilJoinCall(): Promise<void> {
  return new Promise<void>(resolve => {
    const observer = new MutationObserver(changes => {
      for (const change of changes) {
        const target = change.target as HTMLElement;
        if (target.classList.contains('google-material-icons')) {
          const addedNodes = change.addedNodes as NodeListOf<HTMLElement>;
          addedNodes.forEach(node => {
            if (node.textContent === 'call_end') {
              observer.disconnect();
              resolve();
            }
          });
        }
      }
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  });
}

const ResizableComponent = () => {
  const savedSize = localStorage.getItem('panelSize');
  const savedPosition = localStorage.getItem('panelPosition');

  if (savedPosition && savedSize) {
    const { width, height } = JSON.parse(savedSize);
    const { left, top } = JSON.parse(savedPosition);
    return (
      <Rnd
        default={{
          x: left,
          y: top,
          width,
          height,
        }}
        onDragStop={(e, d) => {
          localStorage.setItem(
            'panelPosition',
            JSON.stringify({
              left: d.x,
              top: d.y,
            }),
          );
        }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onResizeStop={(e, direction, ref, delta, position) => {
          localStorage.setItem(
            'panelSize',
            JSON.stringify({
              width: ref.style.width,
              height: ref.style.height,
            }),
          );
        }}>
        <PanelRoutes />
      </Rnd>
    );
  } else {
    return (
      <Rnd
        default={{
          x: 16,
          y: 16,
          width: 600,
          height: 600,
        }}
        onDragStop={(e, d) => {
          localStorage.setItem(
            'panelPosition',
            JSON.stringify({
              left: d.x,
              top: d.y,
            }),
          );
        }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onResizeStop={(e, direction, ref, delta, position) => {
          localStorage.setItem(
            'panelSize',
            JSON.stringify({
              width: ref.style.width,
              height: ref.style.height,
            }),
          );
        }}>
        <PanelRoutes />
      </Rnd>
    );
  }
};

function createPanelResizeble() {
  // Elemento do painel, inserido na pagina
  const panel = document.createElement('div');
  panel.id = 'GPCT-PANEL-ROOT';
  panel.style.position = 'absolute';
  panel.style.left = '16px';
  panel.style.top = '16px';
  panel.style.zIndex = '10000';

  document.body.appendChild(panel);
  attachTwindStyle(panel, document);
  createRoot(panel).render(<ResizableComponent />);
}

(async () => {
  await waitUntilJoinCall();
  createPanelResizeble();
})();
