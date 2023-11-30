import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Checkbox from '../Checkbox';
import Accordion from '../Accordion';
import '@assets/style/markdownStyle.css';

interface ResultMarkdownProps {
  markdown: string;
}

export default function ResultMarkdown({ markdown }: ResultMarkdownProps) {
  function personalizaMarkdown(str: string): string {
    // Verifica se '[ ]' ou '[x]' está presente na string
    const regex = /\[\s?x\s?\]|\[\s?\]/gi;

    // Substitui todas as ocorrências por '- [ ]' ou '- [x]'
    const novaString = str.replace(regex, match => {
      return match.includes('x') ? '- [x]' : '- [ ]';
    });

    return novaString;
  }

  return (
    <ReactMarkdown
      className="remove-tailwindcss"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeRaw, { allowDangerousHtml: true }]]}
      components={{
        input: ({ ...props }) => {
          return <Checkbox {...props} />;
        },
        a: ({ ...props }) => {
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          return <a {...props} target="_blank" rel="noreferrer" />;
        },
        grupo: ({ titulo, children }) => {
          return <Accordion titulo={titulo}>{children}</Accordion>;
        },
      }}>
      {personalizaMarkdown(markdown)}
    </ReactMarkdown>
  );
}
