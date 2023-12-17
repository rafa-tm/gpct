import Header from '@src/components/Header';
import Title from '@src/components/Title';
import Button from '@src/components/Button';
import { useAuthUserStore } from '@src/shared/zustand/useAuthUserStore';
import { Script } from '@src/core/models';
import { useEffect, useState } from 'react';
import {
  createScriptFromUser,
  deleteScriptFromUser,
  getScriptsFromUser,
  transformDateToShowFormat,
} from '@src/core/controllers/User';
import { useNavigate } from 'react-router-dom';
import { IconEdit, IconScriptPlus, IconTrash } from '@tabler/icons-react';

export default function HomePage() {
  const user = useAuthUserStore(state => state.user);
  const [scriptsLoaded, setScriptsLoaded] = useState<Script[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getScriptsFromUser(user.id).then(scripts => {
        setScriptsLoaded(scripts);
      });
    }
  }, [user]);

  function createNewScript() {
    //console.log('Criar novo roteiro');
    const newScript: Script = {
      title: '',
      code: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      shared: false,
    };
    createScriptFromUser(user.id, newScript)
      .then(script => {
        //console.log('Roteiro criado com sucesso', script);
        navigate(`/edit/${script.id}`);
      })
      .catch(error => {
        console.log('Erro ao criar roteiro', error);
      });
  }

  function handleDeleteScript(script: Script) {
    //console.log('Deletar roteiro', script);
    deleteScriptFromUser(user.id, script.id).then(() => {
      setScriptsLoaded(scriptsLoaded.filter(s => s.id !== script.id));
    });
  }

  return (
    <main className="w-full h-screen flex flex-col ">
      <div>
        {/* HEADER */}
        <Header />
      </div>
      {/* EDITOR */}
      <div className="w-full h-full flex gap-6 py-2 px-6 justify-center">
        {scriptsLoaded.length > 0 ? (
          <div className="w-[90%]">
            <div className="w-full flex justify-between items-center">
              <Title order={2}>Seus roteiros</Title>
              <Button
                color="primary"
                className="w-fit py-1 px-2"
                onClick={() => {
                  createNewScript();
                }}>
                <IconScriptPlus size={18} />
                Criar novo roteiro
              </Button>
            </div>

            <table className="w-full text-sm text-left rtl:text-right black">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Titulo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Última atualização
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Criado em
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {scriptsLoaded.map((script, index) => (
                  <tr className="bg-white border-b" key={index}>
                    <th scope="row" className="px-6 py-2 font-medium text-black whitespace-nowrap ">
                      {script.title}
                    </th>
                    <td className="px-6 py-2">{transformDateToShowFormat(script.updated_at)}</td>
                    <td className="px-6 py-2">{transformDateToShowFormat(script.created_at)}</td>
                    <td className="px-6 py-2">
                      <div className="flex gap-2 items-center">
                        <Button
                          color="gray-light"
                          className="w-fit py-1 px-2"
                          onClick={() => {
                            navigate(`/edit/${script.id}`);
                          }}>
                          <IconEdit size={20} />
                        </Button>
                        <Button
                          color="gray-light"
                          className="w-fit py-1 px-2"
                          onClick={() => handleDeleteScript(script)}>
                          <IconTrash size={20} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* <table className="w-full table-auto text-left border-collapse border border-gray-200 rounded-md overflow-hidden shadow-md">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Última atualização</th>
                  <th>Criado em</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {scriptsLoaded.map(script => (
                  <tr
                    key={script.id}
                    className="
                  hover:bg-gray-100 flex items-center justify-between gap-4 w-full px-4 py-2
                  ">
                    <td className="flex items-center justify-center">{script.title}</td>
                    <td className="flex items-center justify-center">{script.updated_at}</td>
                    <td className="flex items-center justify-center">{script.created_at}</td>
                    <td className="flex items-center justify-center">
                      <Button
                        color="tertiary"
                        className="w-fit py-2 px-4"
                        onClick={() => {
                          navigate(`/edit/${script.id.toString()}`);
                        }}>
                        <span>Editar</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6 text-base items-center mt-6">
            <h1 className="text-4xl font-bold">Você não possui roteiros</h1>
            <div className="w-[90%] md:w-[60%] lg:w-[40%] xl:w-1/3 flex flex-col gap-12 text-base items-center">
              <Button
                color="tertiary"
                className="w-fit py-2 px-4"
                onClick={() => {
                  createNewScript();
                }}>
                <span>Criar novo roteiro</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
