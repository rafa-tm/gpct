import { createRoot } from 'react-dom/client';
import ButtonGPCT from '@root/src/pages/content/components/MeetButton/ButtonGPCT';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { attachTwindStyle } from '@src/shared/style/twind';

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

(async () => {
  await waitUntilJoinCall();
  const root = document.createElement('div');
  root.id = 'GPCT-ROOT';
  root.style.display = 'inline-block';
  root.style.width = '40px';
  root.style.height = '40px';
  root.style.margin = '0 6px';
  root.style.verticalAlign = 'middle';
  root.style.cursor = 'pointer';

  const moreButton = [...document.querySelectorAll('.google-material-icons')].find(
    icon => icon.textContent === 'more_vert',
  );
  const insertPoint = moreButton.closest('div').parentElement.parentElement.parentElement;
  insertPoint.parentElement.insertBefore(root, insertPoint);

  const rootIntoShadow = document.createElement('div');
  rootIntoShadow.id = 'shadow-root';

  const shadowRoot = root.attachShadow({ mode: 'open' });
  shadowRoot.appendChild(rootIntoShadow);

  attachTwindStyle(rootIntoShadow, shadowRoot);

  createRoot(rootIntoShadow).render(<ButtonGPCT />);
})();
