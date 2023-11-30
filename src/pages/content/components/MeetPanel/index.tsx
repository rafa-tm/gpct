import { createRoot } from 'react-dom/client';
import ViewGPCT from '@root/src/pages/content/components/MeetPanel/ViewGPCT';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { attachTwindStyle } from '@src/shared/style/twind';
import { Rnd } from 'react-rnd';

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
        <ViewGPCT />
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
        <ViewGPCT />
      </Rnd>
    );
  }
};

function createPanelResizeble() {
  // Elemento do painel, inserido na pagina
  const panel = document.createElement('div');
  panel.id = 'GPCT-PANEL-ROOT';
  panel.style = `
    position: absolute;
    left: 16px;
    top: 16px;
    z-index: 10000;
  `;

  document.body.appendChild(panel);
  attachTwindStyle(panel, document);
  createRoot(panel).render(<ResizableComponent />);
}

(async () => {
  await waitUntilJoinCall();
  createPanelResizeble();
})();
