import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from '@pages/options/AppRoutes';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { attachTwindStyle } from '@src/shared/style/twind';

refreshOnUpdate('pages/options');

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  attachTwindStyle(appContainer, document);
  const root = createRoot(appContainer);
  root.render(<AppRoutes />);
}

init();
