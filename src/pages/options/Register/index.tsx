import React, { useState, useEffect } from 'react';
import Button from '@src/components/Button';
import Input from '@src/components/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { IconArrowBack } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@root/src/core/controllers/Auth';
import { createScriptFromUser } from '@src/core/controllers/User';
import { Error, Script } from '@src/core/models';
import scriptStorage from '@src/shared/storages/scriptStorage';
import useStorage from '@src/shared/hooks/useStorage';

type FormValues = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const validationSchema = yup.object().shape({
  email: yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
  password: yup.string().min(6, 'Senha deve possuir mais de 6 caracteres').required('Campo obrigatório'),
  confirmPassword: yup
    .string()
    .required('Campo obrigatório')
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
});

export default function RegisterPage() {
  const [errorRegister, setErrorRegister] = useState<Error>();
  const [resultRegister, setResultRegister] = useState<{ code: string; message: string } | undefined>();
  const navigate = useNavigate();
  const scriptLocal: Script = useStorage(scriptStorage);

  useEffect(() => {
    if (errorRegister || resultRegister) {
      const second = setTimeout(() => {
        setErrorRegister(null);
        setResultRegister(null);
      }, 3000);

      return () => {
        second;
      };
    }
  }, [errorRegister, resultRegister]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  });

  const onSubmit = data => {
    registerUser(data.email, data.password)
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
            .then(script => {
              console.log('Script criado com sucesso!', script);
              setResultRegister({ code: 'Sucesso!', message: 'Usuário cadastrado com sucesso.' });
              scriptStorage.setScriptLocal({ ...scriptLocal, code: '', title: '' });
              setTimeout(() => {
                navigate('/');
              }, 3000);
            })
            .catch(error => {
              console.log('Erro ao criar script', error);
            });
        } else {
          console.log('Usuário cadastrado com sucesso!', user);
          setResultRegister({ code: 'Sucesso!', message: 'Usuário cadastrado com sucesso.' });
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          setErrorRegister({ code: 'Erro ao Entrar!', message: 'E-mail já cadastrado.' });
        } else {
          setErrorRegister({ code: 'Erro ao Entrar!', message: 'Erro ao cadastrar usuário.' });
        }
      });
  };

  return (
    <div className="w-full flex flex-col h-screen p-8 bg-light text-black font-sans gap-8">
      <div className="w-full flex items-center">
        <Button color="tertiary" className="w-fit py-2 px-4" to="/auth">
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

              <Input
                label="Confirmar Senha"
                placeholder="Digite sua senha novamente"
                id="confirmPassword"
                errors={errors}
                type="password"
                register={register('confirmPassword')}
              />
            </div>

            <Button type="submit" color="primary" className="w-full py-3 px-4 mt-4">
              <span>Cadastrar</span>
            </Button>
            {errorRegister && (
              <div className="w-full flex flex-col gap-2 items-center border bg-red-700 py-2 text-white rounded-md">
                <h1 className="text-base font-semibold">{errorRegister.code}</h1>
                <p className="text-sm">{errorRegister.message}</p>
              </div>
            )}
            {resultRegister && (
              <div className="w-full flex flex-col gap-2 items-center border bg-green-700 py-2 text-white rounded-md">
                <h1 className="text-base font-semibold">{resultRegister.code}</h1>
                <p className="text-sm font-medium">{resultRegister.message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
