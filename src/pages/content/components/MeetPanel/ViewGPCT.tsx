import React from 'react';

import logotipo from '@src/assets/img/icon-128.png';
import ResultMarkdown from '@src/components/ResultMarkdown';
import Button from '@components/Button';
import Input from '@components/Input';
import useStorage from '@src/shared/hooks/useStorage';
import scriptLocalStorage, { ScriptLocal } from '@root/src/shared/storages/scriptLocalStorage';
import { MdOutlineMinimize, MdPerson, MdOutlineArrowBack, MdOutlineLogout, MdOutlineLogin } from 'react-icons/md';
import { getAllScriptsFromUser } from '@src/firebase/db/User';

import { Scripts } from '@src/models/Scripts';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { loginUser, logoutUser } from '@src/firebase/auth';
import { auth } from '@root/src/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const validationSchema = yup.object().shape({
  email: yup.string().email('Insira um e-mail válido').required('Campo obrigatório'),
  senha: yup.string().required('Campo obrigatório'),
});

export default function ViewGPCT() {
  function closeDiv() {
    document.getElementById('GPCT-PANEL-ROOT').style.display = 'none';
  }

  const scriptLocal: ScriptLocal = useStorage(scriptLocalStorage);
  const [user, setUser] = React.useState<User>(null);
  const [userScripts, setUserScripts] = React.useState<Scripts>(null);
  const [login, setLogin] = React.useState<boolean>(false);
  const [showMenu, setShowMenu] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<string>({
    defaultValues: {
      email: '',
      senha: '',
    },
    resolver: yupResolver(validationSchema),
    mode: 'all',
  });

  const onSubmit = (data: { email: string; senha: string }) => {
    loginUser(data.email, data.senha).then(response => {
      if (response.error) {
        console.log(response.error);
        return;
      }

      if (response.user) {
        // getAllScriptsFromUser(response.user.uid).then(scripts => {
        //   setUserScripts(scripts[0]);
        //   console.log(scripts[0]);
        //   setLogin(false);
        // });
        setLogin(false);
        return;
      }
    });
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        getAllScriptsFromUser(user.uid).then(response => {
          if (response) {
            setUserScripts(response[0]);
          }
        });
      } else {
        setUser(null);
        setUserScripts(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full h-full bg-white">
      <header
        id="draggableHeader"
        className="w-full bg-secondary-500 flex justify-between items-center py-1 h-fit pl-4 pr-2 drop-shadow-md">
        <button>
          <img src={logotipo} alt="Logotipo GPCT" width={24} />
        </button>
        <nav className="flex font-black gap-2 items-center">
          <div className="relative">
            <button
              className="bg-primary-500 px-2 py-1 hover:bg-primary-700 flex items-center justify-center"
              onClick={() => setShowMenu(!showMenu)}>
              <MdPerson size={18} />
            </button>
            {showMenu && (
              <div className="absolute top-[30px] right-0 bg-secondary-500 flex flex-col gap-2 py-2 pb-4 px-6 rounded-b-md">
                {user ? (
                  <Button
                    color="transparent"
                    className="px-4 py-1 text-light"
                    onClick={() => {
                      logoutUser();
                      setShowMenu(false);
                    }}>
                    <MdOutlineLogin size={20} />
                    <span>Sair</span>
                  </Button>
                ) : (
                  <Button
                    color="transparent"
                    className="px-4 py-1 text-light"
                    onClick={() => {
                      setLogin(!login);
                      setShowMenu(false);
                    }}>
                    <MdOutlineLogout size={20} />
                    <span>Entrar</span>
                  </Button>
                )}
              </div>
            )}
          </div>

          <button
            className="bg-primary-500 px-2 py-1 hover:bg-primary-700 flex items-center justify-center"
            onClick={closeDiv}>
            <MdOutlineMinimize size={18} />
          </button>
        </nav>
      </header>
      {login ? (
        <div className="w-full flex flex-col gap-8 mt-8 items-center px-8">
          <div className="flex w-full">
            <Button
              type="button"
              className=" py-1 px-4 mt-4"
              onClick={() => {
                setLogin(false);
              }}>
              <MdOutlineArrowBack size={22} />
              <span>Voltar</span>
            </Button>
          </div>
          <form className="w-5/6 flex flex-col gap-6 text-base items-center " onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 items-center">
              <h1 className="text-xl font-bold">Entre agora mesmo!</h1>
              <h2 className="text-lg font-normal text-center">Com sua conta você acessa seus roteiros salvos.</h2>
            </div>
            <div className="w-full flex flex-col gap-4">
              <Input
                label="E-mail"
                type="email"
                id="email"
                placeholder="Digite seu email"
                register={register}
                errors={errors}
              />

              <Input
                label="Senha"
                type="password"
                id="senha"
                placeholder="Digite sua senha"
                register={register}
                errors={errors}
              />
            </div>

            <Button type="submit" color="primary" className="w-full py-3 px-4 mt-4">
              <span>Entrar</span>
            </Button>
          </form>
        </div>
      ) : (
        <div className="w-full py-4 px-8 bg-white">
          <ResultMarkdown markdown={userScripts !== null ? userScripts.code : scriptLocal.code} />
        </div>
      )}
    </div>
  );
}
