import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import AccordionCustom from '@src/components/AccordionCustom';
import CheckboxCustom from '@src/components/CheckboxCustom';
import Title from '@src/components/Title';
import Text from '@src/components/Text';

interface ResultMarkdownProps {
  markdown: string;
}

interface ComponentsPlus extends Components {
  grupo: React.FC<GrupoProps>;
}

type GrupoProps = {
  titulo?: string;
  children?: React.ReactNode;
};

export default function MarkdownResult({ markdown }: ResultMarkdownProps) {
  function personalizaMarkdown(str: string): string {
    // Verifica se '[ ]' ou '[x]' está presente na string
    const regex = /\[\s?x\s?\]|\[\s?\]/gi;

    // Substitui todas as ocorrências por '- [ ]' ou '- [x]'
    const novaString = str.replace(regex, match => {
      return match.includes('x') ? '- [x]' : '- [ ]';
    });

    return novaString;
  }

  const components: ComponentsPlus = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input: ({ checked, onChange }) => {
      return <CheckboxCustom checked={checked} />;
    },
    a: ({ ...props }) => {
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a {...props} target="_blank" rel="noreferrer" />;
    },
    grupo: ({ titulo, children }: GrupoProps) => {
      return <AccordionCustom title={titulo}>{children}</AccordionCustom>;
    },
    h1: ({ children }) => {
      return <Title order={1}>{children}</Title>;
    },
    h2: ({ children }) => {
      return <Title order={2}>{children}</Title>;
    },
    h3: ({ children }) => {
      return <Title order={3}>{children}</Title>;
    },
    h4: ({ children }) => {
      return <Title order={4}>{children}</Title>;
    },
    h5: ({ children }) => {
      return <Title order={5}>{children}</Title>;
    },
    h6: ({ children }) => {
      return <Title order={6}>{children}</Title>;
    },
    p: ({ children }) => {
      return <Text>{children}</Text>;
    },
  };

  return (
    <ReactMarkdown
      className="remove-tailwindcss"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeRaw, { allowDangerousHtml: true }]]}
      components={components}>
      {personalizaMarkdown(markdown)}
    </ReactMarkdown>
  );
}
