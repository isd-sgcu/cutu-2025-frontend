import ReactMarkdown from 'react-markdown';
import { HeadingProps, LiProps } from 'react-markdown/lib/ast-to-react';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';
import './styles.css';

const StyledH1: React.FC<HeadingProps> = ({ children }) => {
  return (
    <h1 className="whitespace-pre-wrap text-center text-lg font-bold">
      {children}
    </h1>
  );
};

const StyledH2: React.FC<HeadingProps> = ({ children }) => {
  return (
    <h1 className="text-md whitespace-pre-wrap text-center font-bold">
      {children}
    </h1>
  );
};

const StyledP: React.FC<ReactMarkdownProps> = ({ children }) => {
  return <p className="text-xs whitespace-pre-wrap">{children}</p>;
};

const StyledLI: React.FC<Omit<LiProps, 'ordered'>> = ({ children }) => {
  return <li className="">{children}</li>;
};

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: StyledH1,
        h2: StyledH2,
        p: StyledP,
        li: StyledLI,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
