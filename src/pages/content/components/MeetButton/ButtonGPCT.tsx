import React from 'react';
import logotipo from '../../../../assets/img/icon-128.png';

export default function ButtonGPCT() {
  const panelRoot = document.getElementById('GPCT-PANEL-ROOT');
  const [isPanelOpen, setIsPanelOpen] = React.useState(panelRoot && panelRoot.style.display !== 'none');

  function toogleExtensionDiv() {
    if (panelRoot && panelRoot.style.display === 'none') {
      panelRoot.style.display = 'block';
      setIsPanelOpen(true);
    } else {
      panelRoot.style.display = 'none';
      setIsPanelOpen(false);
    }
  }

  return (
    <button
      className={
        'w-10 h-10 flex items-center justify-center rounded-full ' + (isPanelOpen ? 'bg-blue-300' : 'bg-[#3c4043]')
      }
      onClick={toogleExtensionDiv}>
      <img src={logotipo} alt="Logotipo" width={20} height={20} />
    </button>
  );
}
