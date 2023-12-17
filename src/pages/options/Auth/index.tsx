import React, { useState, useEffect } from 'react';

import Button from '@src/components/Button';
import Input from '@src/components/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { IconArrowBack } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@root/src/core/controllers/Auth';
import { createScriptFromUser } from '@src/core/controllers/User';
import { Error, Script } from '@src/core/models';
import scriptStorage from '@src/shared/storages/scriptStorage';
import useStorage from '@src/shared/hooks/useStorage';

type FormValues = {
  email?: string;
  password?: string;
};

const validationSchema = yup.object().shape({
  email: yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

export default function AuthPage() {
  const [errorLogin, setErrorLogin] = useState<Error>();
  const [resultLogin, setResultLogin] = useState<{ code: string; message: string } | undefined>();
  const scriptLocal: Script = useStorage(scriptStorage);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  });

  const onSubmit = data => {
    loginUser(data.email, data.password)
      .then(user => {
        if (scriptLocal && scriptLocal.code !== '') {
          const newScript: Script = {
            title: scriptLocal.title,
            code: scriptLocal.code,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            shared: false,
          };
          createScriptFromUser(user.id, newScript)
            .then(() => {
              setResultLogin({ code: 'Sucesso!', message: 'Usuário cadastrado com sucesso.' });
              scriptStorage.setScriptLocal({ ...scriptLocal, code: '', title: '' });
              setTimeout(() => {
                navigate('/');
              }, 3000);
            })
            .catch(error => {
              setErrorLogin({ code: 'Erro ao Cadastrar!', message: error.message });
            });
        } else {
          setResultLogin({ code: 'Sucesso!', message: 'Usuário cadastrado com sucesso.' });
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          setErrorLogin({ code: 'Erro ao Entrar!', message: 'Credenciais inválidas!' });
        } else if (error.code === 'auth/user-not-found') {
          setErrorLogin({ code: 'Erro ao Entrar!', message: 'Usuário não encontrado!' });
        } else if (error.code === 'auth/wrong-password') {
          setErrorLogin({ code: 'Erro ao Entrar!', message: 'Senha incorreta!' });
        } else {
          setErrorLogin({ code: 'Erro ao Entrar!', message: error.message });
        }
      });
  };

  useEffect(() => {
    if (errorLogin || resultLogin) {
      const second = setTimeout(() => {
        setErrorLogin(null);
        setResultLogin(null);
      }, 3000);

      return () => {
        second;
      };
    }
  }, [errorLogin, resultLogin]);

  return (
    <div className="w-full flex flex-col h-screen p-8 bg-light text-black font-sans gap-8">
      <div className="w-full flex items-center">
        <Button color="tertiary" className="w-fit py-2 px-4" to="/">
          <IconArrowBack size={22} />
          <span>Voltar</span>
        </Button>
      </div>
      <div className="w-full items-center flex flex-col gap-10">
        <h1 className="text-4xl font-bold">Entre ou Cadastre-se</h1>
        <div className="w-[90%] md:w-[60%] lg:w-[40%] xl:w-1/3 flex flex-col gap-12 text-base items-center">
          {/* Formulário */}
          <form className="w-full flex flex-col gap-6 text-base items-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col gap-4">
              <Input
                id="email"
                label="E-mail"
                placeholder="Digite seu e-mail"
                errors={errors}
                register={register('email')}
              />

              <Input
                label="Senha"
                placeholder="Digite sua senha"
                id="password"
                errors={errors}
                type="password"
                register={register('password')}
              />
            </div>

            <Button type="submit" color="primary" className="w-full py-3 px-4 mt-4">
              <span>Entrar</span>
            </Button>
            {errorLogin && (
              <div className="w-full flex flex-col gap-2 items-center border bg-red-700 py-2 text-white rounded-md">
                <h1 className="text-base font-semibold">{errorLogin.code}</h1>
                <p className="text-sm">{errorLogin.message}</p>
              </div>
            )}
            {resultLogin && (
              <div className="w-full flex flex-col gap-2 items-center border bg-green-700 py-2 text-white rounded-md">
                <h1 className="text-base font-semibold">{resultLogin.code}</h1>
                <p className="text-sm font-medium">{resultLogin.message}</p>
              </div>
            )}
          </form>
          {/* Linha de Separação */}
          <div className="w-full flex items-center gap-4">
            <div className="w-full h-[2px] bg-stone-500"></div>
            <span className="text-sm font-semibold">ou</span>
            <div className="w-full h-[2px] bg-stone-500"></div>
          </div>
          <Button color="secondary" to="/register" className="w-full py-3 px-4 ">
            <span>Criar nova conta</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
