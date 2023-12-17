import { IconCaretDown, IconCaretLeft } from '@tabler/icons-react';
import { useState } from 'react';

interface AccordionCustomProps {
  title: string;
  children: React.ReactNode | React.ReactNode[] | string;
}

export default function AccordionCustom({ title = '', children = <></> }: AccordionCustomProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="w-[90%] justify-center items-center flex flex-col mx-4 shadow-lg">
      <button
        className="w-full py-2 px-4 bg-slate-100 items-center justify-between flex border border-gray-400"
        onClick={() => setIsOpen(!isOpen)}>
        <h4 className="text-black text-base font-semibold">{title}</h4>
        <span>{isOpen ? <IconCaretDown size={22} /> : <IconCaretLeft size={22} />}</span>
      </button>
      {isOpen && (
        <div className="pb-4 rounded-b-md bg-white flex flex-col gap-2 items-start justify-start w-full p-2">
          {children}
        </div>
      )}
    </div>
  );
}
