import React from 'react';
import { MdDelete, MdHelp, MdClose } from 'react-icons/md';
import { RiExpandLeftFill, RiExpandRightFill, RiEyeFill } from 'react-icons/ri';

import Header from '@components/Header';
import Button from '@components/Button';
import ResultMarkdown from '@components/ResultMarkdown';
import PreviewResult from '@components/PreviewResult';

import useStorage from '@src/shared/hooks/useStorage';
import scriptLocalStorage, { ScriptLocal } from '@root/src/shared/storages/scriptLocalStorage';
import configStorage, { Config } from '@src/shared/storages/configStorage';
import { auth } from '@root/src/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from '@src/models/User';
import { Script } from '@src/models/Scripts';
import { updateScript, getAllScriptsFromUser } from '@src/firebase/db/User';

const tutorialMarkDown = `Este é um tutorial de Markdown

# Titulo 1

## Titulo 2

### Titulo 3

### Checkbox

- [ ] Este é um checkbox desmarcado
- [x] Este é um checkbox marcado

### Grupo expansivel

<grupo titulo="Titulo do Grupo">

### Conteudo do grupo
Este é o conteudo do grupo e só é exibido se você expandir o grupo.

</grupo>

#### e muito mais, veja mais em:
[Documentação completa](https://www.markdownguide.org/basic-syntax/)`;

export default function Editor() {
  const config: Config = useStorage(configStorage);
  const scriptLocal: ScriptLocal = useStorage(scriptLocalStorage);

  const [scriptEdit, setScriptEdit] = React.useState<Script>(scriptLocal);

  const [showTutorial, setShowTutorial] = React.useState(config.tutorial);
  const [scriptTutorial, setScriptTutorial] = React.useState(tutorialMarkDown);
  const [expandView, setExpandView] = React.useState(false);
  const [preview, setPreview] = React.useState(false);

  const [user, setUser] = React.useState<User>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        getAllScriptsFromUser(user.uid).then(response => {
          if (response) {
            console.log(response[0]);
            setScriptEdit(response[0]);
          }
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    function handleSavingScript() {
      if (showTutorial) return;
      if (user) {
        updateScript(user.uid, scriptEdit as Script);
      } else {
        scriptLocalStorage.save({
          title: scriptEdit.title,
          code: scriptEdit.code,
          created_at: scriptEdit.created_at === '' ? new Date().toLocaleString() : scriptEdit.created_at,
          updated_at: new Date().toLocaleString(),
        });
      }
    }
    handleSavingScript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptEdit]);

  function clearMarkdown() {
    setScriptEdit({
      ...scriptEdit,
      code: '',
      title: '',
      updated_at: new Date().toLocaleString(),
      created_at: new Date().toLocaleString(),
    });
    if (!user) scriptLocalStorage.clear();
  }

  function changeConfigTutorial() {
    configStorage.toggleTutorial();
  }

  function changeTutorial() {
    setShowTutorial(!showTutorial);
  }

  return (
    <div className="h-screen flex flex-col gap-2 font-sans bg-light">
      <Header user={user}>
        <div className="w-1/3 flex gap-2 items-center text-white text-base">
          <label htmlFor="tituloScript" className="font-medium">
            Titulo:
          </label>
          <input
            id="tituloScript"
            name="tituloScript"
            type="text"
            value={scriptEdit?.title}
            onChange={event => {
              setScriptEdit({ ...scriptEdit, title: event.target.value, updated_at: new Date().toLocaleString() });
            }}
            placeholder="Insira um titulo para este roteiro"
            className="w-full px-2 bg-transparent border-b-2 border-stone-200 focus:outline-none focus:border-white"
            autoComplete="off"
          />
        </div>
      </Header>
      <div className="w-full h-[90%] flex justify-center items-center gap-6 px-4">
        {/* Preview Modal */}
        {preview && (
          <div className="fixed top-0 left-0 w-full h-full min-h-screen flex items-start justify-center z-50 py-10 bg-[#00000aa6] ">
            <PreviewResult
              close={setPreview}
              markdown={scriptEdit}
              tutorial={{ code: scriptTutorial, ativo: showTutorial }}
            />
          </div>
        )}
        {/* Markdown Side */}
        <div className={`w-full h-full gap-2 ${expandView ? 'hidden' : 'flex flex-col'}`}>
          {/* Botôes */}
          <div className={`flex justify-end items-center ${showTutorial ? 'gap-8' : 'gap-4'}`}>
            {showTutorial && (
              <div className="flex items-center justify-center gap-2 text-lg font-normal text-black">
                <input
                  className="w-[18px] h-[18px] border-2 border-slate-500"
                  type="checkbox"
                  id="tutorial"
                  name="tutorial"
                  checked={!config.tutorial}
                  onChange={changeConfigTutorial}
                />
                <label htmlFor="tutorial">Não exibir tutorial ao iniciar</label>
              </div>
            )}

            {!showTutorial && (
              <Button color="danger" className="py-1 px-2" onClick={clearMarkdown}>
                <MdDelete size={22} />
              </Button>
            )}
            <Button
              className={`py-1 px-2  ${showTutorial ? 'bg-stone-500 hover:bg-stone-600' : ''}`}
              onClick={changeTutorial}>
              {showTutorial ? (
                <>
                  <MdClose size={22} />
                  <span>Sair do tutorial</span>
                </>
              ) : (
                <MdHelp size={22} />
              )}
            </Button>
          </div>
          {/* Texto tutorial */}
          {showTutorial && (
            <p className="text-base font-sans text-center font-normal py-2">
              Aqui à esquerda você enconta a área de inserção do seu texto em Markdown e como você está no modo
              tutorial, estão inseridos algumas das tags que você pode utilizar para criar! Para saber mais sobre o
              Markdown, clique no link ali abaixo. Fique a vontade para editar o texto Markdown, pois ele não será
              salvo.
            </p>
          )}
          {/* TextArea markdown */}
          <textarea
            className="w-full h-full resize-none p-2 placeholder:text-black border border-dark rounded-md text-base font-normal"
            value={showTutorial ? scriptTutorial : scriptEdit.code}
            onChange={event => {
              if (showTutorial) {
                setScriptTutorial(event.target.value);
                return;
              }
              setScriptEdit({ ...scriptEdit, code: event.target.value, updated_at: new Date().toLocaleString() });
            }}
            placeholder="Digite seu markdown aqui e veja o resultado ao lado."
          />
        </div>
        {/* Result Side */}
        <div className="w-full flex flex-col h-full px-2 gap-2 ">
          {/* Botôes */}
          <div className="flex justify-start items-center gap-2">
            <Button color="tertiary" onClick={() => setExpandView(!expandView)} className="py-1 px-2">
              {expandView ? <RiExpandRightFill size={22} /> : <RiExpandLeftFill size={22} />}
            </Button>
            <Button color="primary" onClick={() => setPreview(!preview)}>
              <RiEyeFill size={22} />
              <span>Preview</span>
            </Button>
            {/* <h2 className="w-full text-center text-xl font-sans font-semibold">Roteiro</h2> */}
          </div>
          {/* Texto tutorial */}
          {showTutorial && (
            <p className="text-base font-sans text-center font-normal p-2">
              Já aqui a direira você enconta a área de resultado do seu texto em Markdown, ele é criado a partir do que
              você insere na área de Markdown e é atualizado em tempo real. Você também pode expandir a area de
              resultado ou vizualizar o resultado em uma janale flutuante igual será exibido no Google Meet.
            </p>
          )}
          <div className="w-full h-full bg-slate-200 border border-dark overflow-y-scroll p-4">
            <div className="bg-white min-h-full py-4 px-4 drop-shadow-md">
              <ResultMarkdown markdown={showTutorial ? scriptTutorial : scriptEdit.code} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
