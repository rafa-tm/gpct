import React from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import { MdOutlineArrowBack } from 'react-icons/md';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { loginUser } from '@src/firebase/auth';
import { useNavigate } from 'react-router-dom';
import useStorage from '@src/shared/hooks/useStorage';
import scriptLocalStorage, { ScriptLocal } from '@root/src/shared/storages/scriptLocalStorage';
import { saveScript } from '@src/firebase/db/User';

const validationSchema = yup.object().shape({
  email: yup.string().email('Insira um e-mail válido').required('Campo obrigatório'),
  senha: yup.string().required('Campo obrigatório'),
});

export default function Auth() {
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

  const navigate = useNavigate();
  const scriptLocal: ScriptLocal = useStorage(scriptLocalStorage);

  const onSubmit = (data: { email: string; senha: string }) => {
    loginUser(data.email, data.senha).then(response => {
      if (response.error) {
        console.log(response.error);
        return;
      }

      if (response.user) {
        //console.log(response.user);
        saveScript(response.user.uid, scriptLocal);
        navigate('/');
        return;
      }
    });
  };

  return (
    <div className="w-full flex flex-col h-screen p-8 bg-light text-black font-sans">
      <div className="w-full flex items-center">
        <Button color="tertiary" className="w-fit py-2 px-4" to="/">
          <MdOutlineArrowBack size={22} />
          <span>Voltar</span>
        </Button>
      </div>
      <div className="w-full items-center flex flex-col gap-10">
        <h1 className="text-4xl font-bold">Entre ou Cadastre-se</h1>
        <div className="w-1/3 flex flex-col gap-12 text-base items-center">
          {/* Formulário */}
          <form className="w-full flex flex-col gap-6 text-base items-center" onSubmit={handleSubmit(onSubmit)}>
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
