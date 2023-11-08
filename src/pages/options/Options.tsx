import React from 'react';
import { MdOutlineHelp, MdDelete } from 'react-icons/md';
import { RiExpandLeftFill, RiExpandRightFill, RiEyeFill } from 'react-icons/ri';
import ResultMarkdown from '@components/ResultMarkdown';
import PreviewResult from '@components/PreviewResult';
import Header from '@components/Header';
import Button from '@components/Button';
import useStorage from '@src/shared/hooks/useStorage';
import markdownStorage, { Markdown } from '@src/shared/storages/markdownStorage';

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

const Options: React.FC = () => {
  const markdown: Markdown = useStorage(markdownStorage);
  const [markdownEdit, setMarkdownEdit] = React.useState(markdown ? markdown.content : '');

  const [showTutorial, setShowTutorial] = React.useState(false);
  const [tutorial, setTutorial] = React.useState(tutorialMarkDown);

  const [expandView, setExpandView] = React.useState(false);

  const [preview, setPreview] = React.useState(false);

  function handleMarkdownChange(event?: React.ChangeEvent<HTMLTextAreaElement>) {
    // setMarkdownEdit(event.target.value);
    // markdownStorage.save(event.target.value);

    if (showTutorial) {
      setTutorial(event.target.value);
    } else {
      setMarkdownEdit(event.target.value);
      markdownStorage.save({ id: 0, content: event.target.value });
    }
  }

  function clearMarkdown() {
    setMarkdownEdit('');
    markdownStorage.clear();
  }

  function handleTutorial() {
    setShowTutorial(!showTutorial);
  }

  function expandWindown() {
    setExpandView(!expandView);
  }

  return (
    <div className="w-full flex flex-col min-h-screen pb-8 gap-8 bg-slate-50 text-black">
      <Header>
        <Button onClick={handleTutorial} className={showTutorial ? 'bg-stone-500 hover:bg-stone-600' : ''}>
          <MdOutlineHelp size={22} />
          <span>Tutorial</span>
        </Button>
      </Header>
      <div className="w-full flex flex-col px-8 gap-4">
        {preview && (
          <div className="fixed top-0 left-0 w-full h-full min-h-screen flex items-start justify-center z-50 py-10 bg-[#00000aa6] ">
            <PreviewResult close={setPreview} />
          </div>
        )}
        {/* Header de opções */}
        <div className="w-full flex gap-24">
          {/* Markdown edit Side */}
          {!expandView && (
            <div className="w-1/2 flex gap-4 justify-between items-center">
              <div className="flex">
                <h3 className="text-3xl font-bold">Markdown</h3>
              </div>
              <div className="flex gap-6">
                {!showTutorial && (
                  <Button color="danger" onClick={clearMarkdown}>
                    <MdDelete size={22} />
                  </Button>
                )}
              </div>
            </div>
          )}
          {/* Result Side */}
          <div className="w-1/2 flex gap-4 justify-between items-center">
            <div className="flex gap-4">
              <Button color="secondary" onClick={expandWindown} className="text-base">
                {expandView ? <RiExpandRightFill size={22} /> : <RiExpandLeftFill size={22} />}
              </Button>
              <Button color="primary" onClick={() => setPreview(true)}>
                <RiEyeFill size={20} />
                <span>Preview</span>
              </Button>
            </div>
            <div className="flex">
              <h3 className="text-3xl font-bold">Resultado</h3>
            </div>
          </div>
        </div>
        {/* Janelas */}
        <div className="w-full h-[90vh] flex gap-8">
          {/* Janela Markdown */}
          {!expandView && (
            <div className="w-1/2">
              <textarea
                className="w-full h-full resize-none p-4 bg-[#eff7ff] border-2 border-slate-500 placeholder:text-black rounded-md text-lg font-normal"
                value={showTutorial ? tutorial : markdownEdit}
                onChange={event => handleMarkdownChange(event)}
                placeholder="Digite seu markdown aqui"
              />
            </div>
          )}
          {/* Janela resultado */}
          <div
            className={`${
              expandView ? 'w-full py-4 px-8' : 'w-1/2 p-4'
            } h-full bg-white border-2 border-slate-500 rounded-md overflow-y-scroll`}>
            <ResultMarkdown markdown={showTutorial ? tutorial : markdownEdit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
