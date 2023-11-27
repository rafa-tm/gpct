import React from 'react';
import { MdOutlineMinimize } from 'react-icons/md';
import logotipo from '@src/assets/img/icon-128.png';
import ResultMarkdown from '@src/components/ResultMarkdown';
import { Script } from '@src/models/Scripts';

interface Props {
  close: (value: boolean) => void;
  tutorial?: { code: string; ativo: boolean };
  markdown?: Script;
}

export default function PreviewResult({ close, tutorial, markdown }: Props) {
  return (
    <div className="w-[40%] h-[80%] bg-white overflow-y-scroll">
      <header
        id="draggableHeader"
        className="w-full bg-[#192b52] flex justify-between items-center py-1 h-fit pl-4 pr-2 drop-shadow-md">
        <button>
          <img src={logotipo} alt="Logotipo GPCT" width={24} />
        </button>
        <h1 className="text-white font-bold text-lg">{markdown.title}</h1>
        <nav className="flex font-black gap-2 items-center">
          <button
            className="bg-blue-300 px-2 py-1 hover:bg-blue-200 flex items-center justify-center"
            onClick={() => close(false)}>
            <MdOutlineMinimize size={18} />
          </button>
        </nav>
      </header>
      <div className="w-full py-4 px-8 bg-white">
        <ResultMarkdown markdown={tutorial.ativo ? tutorial.code : markdown.code} />
      </div>
    </div>
  );
}
