import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TextHeader, Link } from "@/components";
import { Code } from "@/components";

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
  code: ({ children, ...props }: any) =>
    children.map((child: string, i: number) => (
      <Code block={child.includes("\n")} code={child} key={i} {...props} />
    )),
};

export const Markdown = ({text, ...props}: {text: string} & Omit<Parameters<typeof ReactMarkdown>[0], "children">) => (
    <ReactMarkdown
        components={customComponents}
        remarkPlugins={[remarkGfm]}
    >
        {text}
    </ReactMarkdown>
)