import React from 'react';

import logotipo from '@src/assets/img/icon-128.png';
import ResultMarkdown from '@src/components/ResultMarkdown';
import useStorage from '@src/shared/hooks/useStorage';
import markdownStorage, { Markdown } from '@src/shared/storages/markdownStorage';
import { MdOutlineMinimize } from 'react-icons/md';

export default function ViewGPCT() {
  function closeDiv() {
    document.getElementById('GPCT-PANEL-ROOT').style.display = 'none';
  }

  const markdown: Markdown = useStorage(markdownStorage);

  return (
    <div className="w-full h-full bg-white">
      <header
        id="draggableHeader"
        className="w-full bg-[#192b52] flex justify-between items-center py-1 h-fit pl-4 pr-2 drop-shadow-md">
        <button>
          <img src={logotipo} alt="Logotipo GPCT" width={24} />
        </button>
        <nav className="flex font-black gap-2 items-center">
          <button
            className="bg-blue-300 px-2 py-1 hover:bg-blue-200 flex items-center justify-center"
            onClick={closeDiv}>
            <MdOutlineMinimize size={18} />
          </button>
        </nav>
      </header>
      <div className="w-full py-4 px-8 bg-white">
        <ResultMarkdown markdown={markdown.content} />
      </div>
    </div>
  );
}
