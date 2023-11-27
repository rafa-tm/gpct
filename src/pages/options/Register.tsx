import React from 'react';
import Button from '@components/Button';
import Input from '@components/Input';
import { MdOutlineArrowBack } from 'react-icons/md';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { registerUser } from '@src/firebase/auth';
import { useNavigate } from 'react-router-dom';
import useStorage from '@src/shared/hooks/useStorage';
import scriptLocalStorage, { ScriptLocal } from '@root/src/shared/storages/scriptLocalStorage';
import { saveScript } from '@src/firebase/db/User';

const validationSchema = yup.object().shape({
  email: yup.string().email('Insira um e-mail válido').required('Campo obrigatório'),
  senha: yup.string().min(6, 'A senha deve conter no mínimo 6 caracteres.').required('Campo obrigatório'),
  confirmSenha: yup
    .string()
    .required('Campo obrigatório')
    .oneOf([yup.ref('senha'), ''], 'Senhas não coincidem'),
});

export default function Register() {
  const [error, setError] = React.useState<string>('');
  const [success, setSuccess] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<string>({
    defaultValues: {
      email: '',
      senha: '',
      confirmSenha: '',
    },
    resolver: yupResolver(validationSchema),
    mode: 'all',
  });

  const navigate = useNavigate();
  const scriptLocal: ScriptLocal = useStorage(scriptLocalStorage);

  const onSubmit = (data: { email: string; senha: string; confirmSenha: string }) => {
    registerUser(data.email, data.senha).then(response => {
      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.user) {
        setSuccess(true);
        saveScript(response.user.uid, scriptLocal);
        setTimeout(() => {
          navigate('/');
        }, 2000);
        return;
      }
    });
  };

  return (
    <div className="w-full flex flex-col h-screen p-8 bg-light text-black font-sans">
      <div className="w-full flex items-center">
        <Button color="tertiary" className="w-fit py-2 px-4" to="/auth">
          <MdOutlineArrowBack size={22} />
          <span>Voltar</span>
        </Button>
      </div>
      <div className="w-full items-center flex flex-col gap-10">
        <h1 className="text-4xl font-bold">Cadastre-se</h1>
        <div className="w-1/3 flex flex-col gap-6 text-base items-center">
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

              <Input
                label="Confirmar Senha"
                type="password"
                id="confirmSenha"
                placeholder="Confirme sua senha"
                register={register}
                errors={errors}
              />
            </div>

            <Button color="primary" className="w-full py-3 px-4 mt-4">
              <span>Cadastrar</span>
            </Button>
            <div>
              {error && (
                <div className="w-full flex items-center justify-center gap-2 text-lg font-normal text-error">
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="w-full flex items-center justify-center gap-2 text-lg font-normal text-black">
                  <span>Cadastro realizado com sucesso!</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
