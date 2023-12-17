import React, { useState, useEffect } from 'react';
import Button from '@src/components/Button';
import Input from '@src/components/Input';
import logotipo from '@assets/img/icon-128.png';
import { IconArrowBack } from '@tabler/icons-react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@root/src/core/controllers/Auth';
import { useAuthUserStore } from '@root/src/shared/zustand/useAuthUserStore';
import { Error } from '@src/core/models';

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
  const toggleAuth = useAuthUserStore(state => state.toggleAuth);
  const navigate = useNavigate();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    loginUser(data.email, data.password)
      .then(() => {
        toggleAuth();
        setResultLogin({ code: 'Sucesso!', message: 'Usuário cadastrado com sucesso.' });
        setTimeout(() => {
          navigate('/list');
        }, 3000);
      })
      .catch(error => {
        console.log(error);
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
  return (
    <div className="w-full h-full bg-white border border-black">
      <div className="w-full bg-gray-700 py-1 flex justify-start px-2">
        <Button color="gray-light" to="/" className="text-sm py-1 px-2 gap-1">
          <IconArrowBack size={20} />
          Voltar
        </Button>
      </div>
      <div className="w-full h-full flex flex-col justify-start items-center mt-6">
        {/* Imagem */}
        <div className="w-[50%] flex flex-col justify-center items-center">
          <img src={logotipo} alt="Logotipo GPCT" className="w-16 h-16" />
          <h3 className="mt-4 text-lg font-semibold">Entre em sua conta</h3>
          <h5 className="text-lg font-semibold">E acesse seus roteiros salvos</h5>
        </div>
        {/* Formulário */}
        <form className="w-2/3 flex flex-col gap-6 text-base items-center" onSubmit={handleSubmit(onSubmit)}>
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
      </div>
    </div>
  );
}
