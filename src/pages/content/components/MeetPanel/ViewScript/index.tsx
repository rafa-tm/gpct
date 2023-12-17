import Button from '@src/components/Button';
import MarkdownResult from '@pages/content/components/MeetPanel/MarkdownResult';
import { IconLogin2, IconScript, IconLogout } from '@tabler/icons-react';
import scriptStorage from '@src/shared/storages/scriptStorage';
import useStorage from '@src/shared/hooks/useStorage';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthUserStore } from '@src/shared/zustand/useAuthUserStore';
import { useEffect, useState } from 'react';
import { getScriptFromUser, getLastUpdatedScriptFromUser } from '@src/core/controllers/User';
import { logoutUser } from '@src/core/controllers/Auth';
import { Script } from '@src/core/models';

export default function ViewScriptPage() {
  const { id } = useParams();
  const { user, isAuth } = useAuthUserStore(state => state); // User from zustand
  const scriptLocal = useStorage(scriptStorage);
  const [scriptForView, setScriptForView] = useState<Script>(scriptLocal); // Script for view
  const navigate = useNavigate();

  useEffect(() => {
    const scriptId = id;
    if (user && isAuth && id) {
      getScriptFromUser(user.id, scriptId).then(script => {
        setScriptForView(script);
      });
    } else if (user && isAuth && !id) {
      getLastUpdatedScriptFromUser(user.id)
        .then(script => {
          setScriptForView(script);
        })
        .catch(error => {
          console.log('ERROR:', error);
        });
    } else {
      setScriptForView(scriptLocal);
    }
  }, [id, isAuth, scriptLocal, user]);

  function handleLogout() {
    logoutUser().then(() => {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    });
  }

  return (
    <div className="w-full h-full bg-white border border-black">
      <div className="w-full bg-gray-700 py-1 flex justify-between items-center px-2">
        <h5 className="text-base font-medium text-white">{scriptForView.title}</h5>
        {user && isAuth ? (
          <div className="flex items-center gap-2">
            <Button color="gray-light" to="/list" className="text-sm py-1 px-2 gap-1">
              <IconScript size={18} />
              Meus roteiros
            </Button>
            <Button color="gray-light" onClick={handleLogout} className="text-sm py-1 px-2 gap-1">
              <IconLogout size={18} />
              Sair
            </Button>
          </div>
        ) : (
          <Button color="gray-light" to="/auth" className="text-sm py-1 px-2 gap-1">
            <IconLogin2 size={18} />
            Entrar
          </Button>
        )}
      </div>
      <div className="w-full h-full">
        {(!user && !isAuth) || (!id && scriptForView.id === '-1') ? (
          <div className="px-8 flex justify-center items-center bg-gray-700  py-1 rounded-b">
            <p className="text-base font-medium text-white">Visualizando roteiro armazenado localmente!</p>
          </div>
        ) : null}
        <div className="w-full h-[calc(100%-68px)] overflow-y-scroll p-2 flex flex-col gap-4">
          <MarkdownResult markdown={scriptForView.code} />
        </div>
      </div>
    </div>
  );
}
