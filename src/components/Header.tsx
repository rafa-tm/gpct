import React from 'react';
import logotipo from '../assets/img/icon-128.png';
import Button from './Button';
import { MdPerson, MdOutlineLogout } from 'react-icons/md';
import { logoutUser } from '@src/firebase/auth';
import { User } from '@src/models/User';

export default function Header({
  children,
  menu,
  user,
}: {
  children: React.ReactNode;
  menu: React.ReactNode;
  user: User;
}) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="w-full flex justify-between items-center bg-secondary-500 gap-10 py-2 px-12 relative font-sans">
      <img src={logotipo} width={32} alt="Logotipo da extensão GPCT" />
      <>{children}</>
      <nav className="flex gap-6 items-center">
        {user !== null ? (
          <Button className="rounded-full py-1 px-3" onClick={() => setShowMenu(!showMenu)}>
            <span className="uppercase font-bold">{user?.email[0]}</span>
          </Button>
        ) : (
          <Button color="tertiary" to="auth">
            <MdPerson size={22} />
            <span>Entre ou Cadastre-se</span>
          </Button>
        )}
      </nav>
      {showMenu && (
        <div className="absolute right-2 top-12 bg-secondary-500 rounded-b-md drop-shadow-lg p-4 z-50 flex flex-col gap-4 text-white">
          {/* <Button color="transparent" className="w-full gap-4 flex justify-start ">
            <MdOutlineSettings size={20} />
            <span>Configurações</span>
          </Button> */}
          {menu}

          <Button
            color="transparent"
            className="w-full gap-4 flex justify-start"
            onClick={() => {
              logoutUser();
              setShowMenu(false);
            }}>
            <MdOutlineLogout size={20} />
            <span>Sair</span>
          </Button>
        </div>
      )}
    </div>
  );
}
