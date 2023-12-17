import React from 'react';
import logotipo from '@assets/img/icon-128.png';
import Button from '@src/components/Button';
import { logoutUser } from '@src/core/controllers/Auth';
import { User } from '@src/core/models';
import { useAuthUserStore } from '@src/shared/zustand/useAuthUserStore';
import { useNavigate } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';

interface HeaderProps {
  children?: React.ReactNode;
  childrenAuth?: React.ReactNode;
  childrenMenu?: React.ReactNode;
}

export default function Header({ children, childrenAuth, childrenMenu }: HeaderProps) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = React.useState(false);
  const user: User = useAuthUserStore(state => state.user);
  const isAuth = useAuthUserStore(state => state.isAuth);

  return (
    <div className="w-full flex justify-between items-center bg-gray-800 gap-10 py-2 px-12 relative font-sans">
      <img src={logotipo} width={24} alt="Logotipo da extensão GPCT" />
      <nav className="flex gap-6 items-center">
        {children}
        {user && isAuth ? (
          <>
            {childrenAuth}

            <Button className="rounded-full py-1 px-3" onClick={() => setShowMenu(!showMenu)}>
              <span className="uppercase font-bold">{user?.email[0]}</span>
            </Button>
          </>
        ) : (
          <Button color="tertiary" to="auth">
            <span>Entre ou Cadastre-se</span>
          </Button>
        )}
      </nav>
      {showMenu && (
        <div className="absolute right-2 top-12 w-48 bg-gray-800 rounded-b-md drop-shadow-lg p-4 z-50 flex flex-col gap-4 text-white">
          {childrenMenu}
          <Button
            color="transparent"
            className="w-full gap-4 flex justify-start"
            onClick={() => {
              logoutUser().then(() => {
                setShowMenu(false);
                navigate('/');
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              });
            }}>
            <IconLogout size={22} />
            <span>Sair</span>
          </Button>
        </div>
      )}
    </div>
  );
}
