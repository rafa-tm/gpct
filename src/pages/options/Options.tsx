import React from 'react';
import { MdOutlineHelp, MdDelete, MdClose } from 'react-icons/md';
import { RiExpandLeftFill, RiExpandRightFill, RiEyeFill } from 'react-icons/ri';
import ResultMarkdown from '@components/ResultMarkdown';
import PreviewResult from '@components/PreviewResult';
import Header from '@components/Header';
import Button from '@components/Button';
import useStorage from '@src/shared/hooks/useStorage';
import markdownStorage, { Markdown } from '@src/shared/storages/markdownStorage';
import configStorage, { Config } from '@src/shared/storages/configStorage';

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
  const config: Config = useStorage(configStorage);
  const markdown: Markdown = useStorage(markdownStorage);
  const [markdownEdit, setMarkdownEdit] = React.useState(markdown ? markdown.content : '');

  const [showTutorial, setShowTutorial] = React.useState(config.tutorial);
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
    if (showTutorial) {
      return;
    } else {
      setMarkdownEdit('');
      markdownStorage.save({ id: 0, content: '' });
    }
  }

  function handleTutorial() {
    setShowTutorial(!showTutorial);
  }

  function changeConfigTutorial() {
    configStorage.toggleTutorial();
  }

  function expandWindown() {
    setExpandView(!expandView);
  }

  return (
    <div className="w-full flex flex-col min-h-screen pb-8 gap-8 bg-slate-50 text-black">
      <Header>
        {showTutorial && (
          <div className="flex items-center gap-4 text-lg font-medium text-white">
            <input
              className="w-4 h-4 border-2 border-slate-500"
              type="checkbox"
              checked={!config.tutorial}
              onChange={changeConfigTutorial}
            />
            <span>Não exibir tutorial ao iniciar</span>
          </div>
        )}
        <Button onClick={handleTutorial} className={showTutorial ? 'bg-stone-500 hover:bg-stone-600' : ''}>
          {showTutorial ? (
            <>
              <MdClose size={22} />
              <span>Fechar tutorial</span>
            </>
          ) : (
            <MdOutlineHelp size={24} />
          )}
        </Button>
      </Header>
      <div className="w-full flex flex-col px-8 gap-4">
        {/* Texto tutorial */}
        {showTutorial && (
          <>
            <div className="w-full flex flex-col gap-2 text-xl font-medium text-center mb-8">
              <h1 className="w-full flex flex-col gap-2 text-2xl font-bold underline">
                Bem-vindo(a) à facilidade em suas reuniões!
              </h1>
              <p>
                Com a extensão GPCT você aplica o método Goals, Plans, Challenges, Timing de forma muito mais facil!
              </p>
              <p>Para começar, vamos entender melhor a interface:</p>
            </div>
            <div className="w-full flex gap-12 mb-12">
              {/* Tutorial de editor */}
              <div className="w-1/2 flex gap-4 text-lg font-normal text-center ">
                <p>
                  Nessa área a esquerda você enconta a area de inserção do seu texto em Markdown e como você está no
                  modo tutorial, estão inseridos algumas das tags que você pode utilizar para criar! Para saber mais
                  sobre o Markdown, clique no link ali abaixo. E se quiser testar, fique a vontade para editar o texto
                  Markdown, pois ele não será salvo.
                </p>
              </div>
              {/* Separador de coluna */}
              <div className="w-px bg-slate-500" />
              {/* Tutorial de resultado */}
              <div className="w-1/2 flex gap-4 text-lg font-normal text-center">
                <p>
                  Nesta area a direira você enconta a area de resultado do seu texto em Markdown, ele é criado a partir
                  do que você insere na area de Markdown e é atualizado em tempo real. Você também pode expandir a area
                  de resultado ou vizualizar o resultado em uma janale flutuante igual será exibido no Google Meet.
                </p>
              </div>
            </div>
          </>
        )}
        {preview && (
          <div className="fixed top-0 left-0 w-full h-full min-h-screen flex items-start justify-center z-50 py-10 bg-[#00000aa6] ">
            <PreviewResult close={setPreview} tutorial={showTutorial ? tutorial : ''} />
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
                <Button color="danger" onClick={clearMarkdown}>
                  <MdDelete size={22} />
                  {showTutorial ? <span>Limpar</span> : ''}
                </Button>
              </div>
            </div>
          )}
          {/* Result Side */}
          <div className="w-1/2 flex gap-4 justify-between items-center">
            <div className="flex gap-4">
              <Button color="secondary" onClick={expandWindown} className="text-base">
                {expandView ? <RiExpandRightFill size={22} /> : <RiExpandLeftFill size={22} />}
                {showTutorial ? expandView ? <span>Reduzir</span> : <span>Expandir</span> : ''}
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
