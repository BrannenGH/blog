import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TextHeader } from "./text-header";
import { Link } from "./link";
import { Code } from "./code";

const renderHeader = ({level, ...props}: {level: 1 | 2 | 3 | 4 | 5 | 6} & any) => (
  <TextHeader level={level} {...props} />
)

const customComponents = {
  h1: ({ node, ...props }: any) => renderHeader({level: 1, ...props}),
  h2: ({ node, ...props }: any) => renderHeader({level: 2, ...props}),
  h3: ({ node, ...props }: any) => renderHeader({level: 3, ...props}),
  h4: ({ node, ...props }: any) => renderHeader({level: 4, ...props}),
  h5: ({ node, ...props }: any) => renderHeader({level: 5, ...props}),
  h6: ({ node, ...props }: any) => renderHeader({level: 6, ...props}),
  a: ({ node, ...props }: any) => (
    <Link className="underline" {...props} />
  ),
  code: ({ children, className, ...props }: { children: string[], className?: string } & any) =>
    children.map((child: string, i: number) => {
      const language = className?.split(" ").find((x: string) => x.includes("language-"))?.substring("language-".length);
      // Remove trailing newline
      if (child.substring(child.length - 1) === "\n") {
        child = child.substring(0, child.length - 1);
      }

      if (child.includes("\n")) {
        return ( 
          <Code block code={child} key={i} language={language} {...props} />
        )
      }

      return ( 
        <Code code={child} key={i} language={language} {...props} />
      );
    }),
};

export const Markdown = ({text, ...props}: {text: string} & Omit<Omit<Omit<Parameters<typeof ReactMarkdown>[0], "children">, "remarkPlugins">, "components">) => (
    <ReactMarkdown
        components={customComponents}
        remarkPlugins={[remarkGfm]}
        {...props}
    >
        {text}
    </ReactMarkdown>
)