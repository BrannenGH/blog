import { Highlight, themes } from "prism-react-renderer";

/**
 * Props of the child that is passed to the Highlight component.
 */
type HightlightRenderProps = Parameters<
  Parameters<typeof Highlight>[0]["children"]
>[0];

/**
 * The type of a single token in the highlighted code.
 */
type Token = HightlightRenderProps["tokens"][0][0];

/**
 * Props for the Code component.
 */
type CodeProps = {
  /**
   * Whether the code should be displayed inline or as a block.
   */
  block?: boolean;
  /**
   * The code to highlight.
   */
  code: string;
  /**
   * The programming language to highlight.
   */
  language: string;
} & (
  | React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLPreElement>,
      HTMLPreElement
    >
  | React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
);

/**
 * A component that formats code.
 */
export const Code = ({
  code,
  block,
  language, 
  ...props
}: CodeProps) => (
  <Highlight theme={themes.github} code={code} language={language}>
    {RenderCode({ block, ...props})}
  </Highlight>
);

/**
 * Returns a component that is the child for the <Highlight /> component.
 * @param block Whether the code should be displayed inline or as a block.
 * @returns A component that acts a child to <Highlight />.
 */
const RenderCode = ({ block, className: rootClassName, ...props }: { block?: boolean } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  /**
   * Child for the <Highlight /> component.
   * @param props Props for rendering the highlighted code.
   * @returns The rendered highlighted code.
   */
  const RenderCode = ({
    className,
    tokens,
    getTokenProps
  }: HightlightRenderProps) => {
    if (block) {
      return (
        <code className={`bg-gray-100 text-gray-800 p-4 my-2 rounded font-mono whitespace-pre overflow-x-auto block ${className} ${rootClassName}`} {...props}>
          {tokens.map((line: Token[], i: number) => (
            <span key={i} className="block">
              <span>{i + 1} </span>
              {line.map((token: Token, key: number) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </span>
          ))}
        </code>
      );
    }

    const allTokens = tokens.reduce((accum: Token[], next: Token[]) => accum.concat(next), []);

    return (
      <code className={`bg-gray-100 text-gray-800 font-mono ${className} ${rootClassName}`} {...props}>
        {allTokens.map((token: Token, key: number) => (
          <span key={key} {...getTokenProps({ token })} />
        ))}
      </code>
    );
  };

  return RenderCode;
};