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
      {markdown}
    </ReactMarkdown>
  );
}
