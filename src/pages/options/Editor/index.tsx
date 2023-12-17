import {
  IconEye,
  IconHelp,
  IconLayoutSidebarLeftExpandFilled,
  IconLayoutSidebarRightExpandFilled,
  IconTrash,
  IconScript,
} from '@tabler/icons-react';

import Header from '@src/components/Header';
import MarkdownResult from '@src/components/MarkdownResult';
import Input from '@src/components/Input';
import Button from '@src/components/Button';
import CheckboxCustom from '@src/components/CheckboxCustom';
import PreviewResult from '@src/components/PreviewResult';
import { markdownTutorial } from '@pages/options/Editor/MarkdownTutorial';

import { Script } from '@src/core/models';
import { useAuthUserStore } from '@src/shared/zustand/useAuthUserStore';
import { getScriptFromUser, updateScriptFromUser } from '@src/core/controllers/User';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import editorConfigStorage from '@src/shared/storages/editorConfigStorage';
import scriptStorage from '@src/shared/storages/scriptStorage';
import useStorage from '@src/shared/hooks/useStorage';

export default function EditorPage() {
  const { id } = useParams();
  const { user, isAuth } = useAuthUserStore(state => state); // User from zustand

  const scriptLocal = useStorage(scriptStorage); // Script local
  const [scriptEdit, setScriptEdit] = useState<Script>(scriptLocal); // Script editable
  const [expandView, setExpandView] = useState(false); // Boolean to expand view
  const { tutorial } = useStorage(editorConfigStorage); // Tutorial config from storage
  const [showtutorial, setShowTutorial] = useState(tutorial); // Boolean to show tutorial
  const [showPreview, setShowPreview] = useState(false); // Boolean to show preview result

  useEffect(() => {
    const scriptId = id;
    if (user && isAuth) {
      getScriptFromUser(user.id, scriptId).then(script => {
        // console.log('SCRIPT:', script);
        setScriptEdit(script);
      });
    }
  }, [id, isAuth, user]);

  const handleScriptChange = (value: string) => {
    setScriptEdit({ ...scriptEdit, code: value });
    if (user && isAuth) {
      updateScriptFromUser(user.id, {
        ...scriptEdit,
        code: value,
        updated_at: new Date().toISOString(),
      });
    } else {
      scriptStorage.setScriptLocal({ ...scriptEdit, code: value, updated_at: new Date().toISOString() });
    }
  };

  const handleTitleChange = (value: string) => {
    setScriptEdit({ ...scriptEdit, title: value });
    if (user && isAuth) {
      updateScriptFromUser(user.id, {
        ...scriptEdit,
        title: value,
        updated_at: new Date().toISOString(),
      });
    } else {
      scriptStorage.setScriptLocal({ ...scriptEdit, title: value, updated_at: new Date().toISOString() });
    }
  };

  const handleClearScript = () => {
    setScriptEdit({ ...scriptEdit, code: '' });
    if (user && isAuth) {
      updateScriptFromUser(user.id, {
        ...scriptEdit,
        code: '',
        updated_at: new Date().toISOString(),
      });
    } else {
      scriptStorage.setScriptLocal({ ...scriptEdit, code: '', updated_at: new Date().toISOString() });
    }
  };

  return (
    <main className="w-full h-screen flex flex-col ">
      <div>
        {/* HEADER */}
        <Header
          childrenAuth={
            <Button color="tertiary" to="/">
              <IconScript size={20} />
              <span>Meus roteiros</span>
            </Button>
          }
        />
      </div>
      {/* EDITOR */}
      <div className="w-full h-[calc(100vh-48px)] flex gap-6 py-2 px-6">
        {/* LEFT */}
        {!expandView && (
          <div className="w-full h-full flex flex-col gap-2">
            {showtutorial && (
              <div className="w-full min-h-[15%] flex items-center justify-center py-2 text-black">
                {/* texto explicando o uso da extensão e como funciona o markdown */}
                <p className="text-base font-sans text-center p-2">
                  Aqui à esquerda você enconta a área de inserção do seu texto em Markdown e como você está no modo
                  tutorial, estão inseridos algumas das tags que você pode utilizar para criar! Para saber mais sobre o
                  Markdown, clique no link ali abaixo. Para sair do modo tutorial, clique no ícone de ajuda.
                </p>
              </div>
            )}
            {/* TITLE and Buttons */}
            <div className="w-full flex justify-between items-center gap-4">
              {showtutorial ? (
                <div className="flex items-center justify-center">
                  <h2 className="text-lg font-black leading-4">Tutorial GPCT</h2>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center">
                  <Input
                    direction="row"
                    label="Titulo"
                    className="w-3/5 text-sm"
                    id="title"
                    value={scriptEdit.title}
                    onChange={event => {
                      handleTitleChange(event.target.value);
                    }}
                  />
                </div>
              )}

              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-4">
                  {showtutorial && (
                    <CheckboxCustom
                      checked={tutorial}
                      onChange={() => editorConfigStorage.toggleTutorial()}
                      label="Exibir tutorial sempre que abrir o editor"
                    />
                  )}
                  <Button
                    color={showtutorial ? 'gray-dark' : 'gray-light'}
                    className="px-2 py-1"
                    onClick={() => setShowTutorial(!showtutorial)}>
                    <IconHelp size={20} />
                  </Button>
                </div>

                <Button color="danger" className="px-2 py-1" onClick={handleClearScript}>
                  <IconTrash size={20} />
                </Button>
              </div>
            </div>

            <textarea
              className="w-full h-full resize-none border border-primary-700 rounded-sm bg-slate-50 focus:outline-gray-500 p-4 text-black font-mono text-base"
              value={showtutorial ? markdownTutorial : scriptEdit.code}
              onChange={e => {
                if (showtutorial) return;
                handleScriptChange(e.target.value);
              }}
            />
          </div>
        )}
        {/* RIGHT */}
        <div className="w-full h-full flex flex-col gap-2 ">
          {showtutorial && (
            <div className="w-full min-h-[15%] flex items-center justify-center py-2 text-black">
              <p className="text-base font-sans text-center p-2">
                Já aqui a direira você enconta a área de resultado do seu texto em Markdown, ele é criado a partir do
                que você insere na área de Markdown e é atualizado em tempo real. Você também pode expandir a área de
                resultado ou vizualizar o resultado em uma janale flutuante igual será exibido no Google Meet.
              </p>
            </div>
          )}
          <div className="w-full flex justify-start items-center gap-4 py-1">
            <div className="flex gap-2 items-center">
              <Button color="gray-light" className="px-2 py-1" onClick={() => setExpandView(!expandView)}>
                {expandView ? (
                  <IconLayoutSidebarLeftExpandFilled size={20} />
                ) : (
                  <IconLayoutSidebarRightExpandFilled size={20} />
                )}
              </Button>
              <Button color="tertiary" className="px-2 py-1" onClick={() => setShowPreview(!showPreview)}>
                <IconEye size={20} />
              </Button>
            </div>
          </div>

          <div className="w-full h-full rounded-sm bg-slate-100 border border-gray-700 p-4 text-black overflow-y-scroll">
            <MarkdownResult markdown={showtutorial ? markdownTutorial : scriptEdit.code} />
          </div>
        </div>
      </div>
      {showPreview && (
        <PreviewResult
          script={
            showtutorial
              ? {
                  id: 'tutorial',
                  title: 'Tutorial GPCT',
                  code: markdownTutorial,
                  created_at: '',
                  updated_at: '',
                }
              : scriptEdit
          }
          onClose={() => setShowPreview(false)}
        />
      )}
    </main>
  );
}
