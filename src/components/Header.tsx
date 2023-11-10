import React from 'react';
import logotipo from '../assets/img/icon-128.png';

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-between items-center bg-[#192b52] gap-10 py-2 px-12">
      <img src={logotipo} width={40} alt="Logotipo da extensão GPCT" />
      {children ? (
        <nav className="flex gap-16 items-center">{children}</nav>
      ) : (
        <h1 className="text-lg font-semibold text-white">Bem vindo à facilidade em suas reuniões!</h1>
      )}
    </div>
  );
}
