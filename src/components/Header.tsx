import logotipo from '../assets/img/icon-128.png';

export default function Header() {
  return (
    <div className="w-full flex justify-start items-center bg-[#192b52] gap-10 py-2 px-12">
      <img src={logotipo} width={40} alt="Logotipo da extensão GPCT" />
      <h1 className="text-lg font-semibold text-white">Bem vindo à facilidade em suas reuniões!</h1>
    </div>
  );
}
