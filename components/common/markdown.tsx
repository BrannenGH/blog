import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TextHeader } from "./text-header";
import { Link } from "./link";
import { Code } from "./code";

const customComponents = {
  h1: ({ node, ...props }: any) => (
    <TextHeader className="text-4xl mb-4" {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <TextHeader className="text-3xl mb-4" {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <TextHeader className="text-2xl mb-4" {...props} />
  ),
  h4: ({ node, ...props }: any) => (
    <TextHeader className="text-xl mb-4" {...props} />
  ),
  h5: ({ node, ...props }: any) => (
    <TextHeader className="text-lg mb-4" {...props} />
  ),
  h6: ({ node, ...props }: any) => (
    <TextHeader className="text-base mb-4" {...props} />
  ),
  a: ({ node, ...props }: any) => (
    <Link className="text-blue-600 hover:underline" {...props} />
  ),
  code: ({ children, className, ...props }: { children: string[], className?: string }) =>
    children.map((child: string, i: number) => {
      const language = className?.split(" ").find(x => x.includes("language-"))?.substring("language-".length);
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