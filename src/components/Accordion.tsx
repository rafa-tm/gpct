import React, { useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

interface AccordionProps {
  titulo: string;
  children: React.ReactNode | React.ReactNodeArray;
}

export default function Accordion({ titulo, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full flex flex-col items-start justify-start mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'border border-b-0 border-[#e2e8f0]' : 'border border-[#e2e8f0]'
        } flex gap-2 w-full items-center text-xl px-1 py-1 font-bold`}>
        <span>{isOpen ? <MdExpandLess size={22} /> : <MdExpandMore size={22} />}</span>
        <h6 className="text-xl font-bold">{titulo}</h6>
      </button>
      {isOpen && (
        <div className={`border border-t-0 border-[#e2e8f0] w-full flex flex-col gap-1 pt-4 px-8`}>{children}</div>
      )}
    </div>
  );
}
