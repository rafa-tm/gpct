import React from 'react';
import { MdOutlineMinimize } from 'react-icons/md';
import logotipo from '@src/assets/img/icon-128.png';
import ResultMarkdown from '@src/components/ResultMarkdown';
import useStorage from '@src/shared/hooks/useStorage';
import markdownStorage, { Markdown } from '@src/shared/storages/markdownStorage';

export default function PreviewResult({ close, tutorial }: { close: (value: boolean) => void; tutorial?: string }) {
  const markdown: Markdown = useStorage(markdownStorage);
  // const [markdownContent, setMarkdownContent] = React.useState(markdown ? markdown.content : '');
  return (
    <div className="w-[40%] h-[80%] bg-white overflow-y-scroll">
      <header
        id="draggableHeader"
        className="w-full bg-[#192b52] flex justify-between items-center py-1 h-fit pl-4 pr-2 drop-shadow-md">
        <button>
          <img src={logotipo} alt="Logotipo GPCT" width={24} />
        </button>
        <nav className="flex font-black gap-2 items-center">
          <button
            className="bg-blue-300 px-2 py-1 hover:bg-blue-200 flex items-center justify-center"
            onClick={() => close(false)}>
            <MdOutlineMinimize size={18} />
          </button>
        </nav>
      </header>
      <div className="w-full py-4 px-8 bg-white">
        <ResultMarkdown markdown={tutorial ? tutorial : markdown.content} />
      </div>
    </div>
  );
}
