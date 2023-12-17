import Title from '@src/components/Title';
import Button from '@src/components/Button';
import { IconArrowBack, IconEye } from '@tabler/icons-react';
import { getScriptsFromUser, transformDateToShowFormat } from '@src/core/controllers/User';
import { useAuthUserStore } from '@src/shared/zustand/useAuthUserStore';
import { Script } from '@src/core/models';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListScriptsPage() {
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
  return (
    <main className="w-full h-full flex flex-col bg-white border border-black">
      <div className="w-full bg-gray-700 py-1 flex justify-start px-2">
        <Button color="gray-light" to="/" className="text-sm py-1 px-2 gap-1">
          <IconArrowBack size={20} />
          Voltar
        </Button>
      </div>
      <div className="w-full h-full flex gap-6 py-2 px-6 justify-center">
        {scriptsLoaded.length > 0 ? (
          <div className="w-[90%]">
            <div className="w-full flex justify-between items-center">
              <Title order={2}>Seus roteiros</Title>
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
                            navigate(`/${script.id}`);
                          }}>
                          <IconEye size={20} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6 text-base items-center mt-6">
            <h1 className="text-4xl font-bold">Você não possui roteiros</h1>
          </div>
        )}
      </div>
    </main>
  );
}
