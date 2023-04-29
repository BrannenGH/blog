import ReactMarkdown from "react-markdown";
import { getArticle, getArticles } from "@/services/article";
import { Article } from "@/models";
import remarkGfm from "remark-gfm";
import { TextHeader, Link } from "@/components";
import { Highlight, themes } from "prism-react-renderer";
import { Code } from "@/components";

export async function getStaticPaths() {
  return {
    paths: getArticles().map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: false,
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context: { params: { slug: string } }) {
  return {
    // Passed to the page component as props
    props: { article: getArticle(context.params.slug) },
  };
}

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

export default function Post({ article }: { article: Article }) {
  return (
    <article>
      <header>
        <h1 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10 mb-2">
          {article.title}
        </h1>
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm leading-5 font-medium text-gray-900">
              {article.author}
            </p>
            <p className="text-sm leading-5 text-gray-500">{article.date}</p>
            {article.tags.map((tag: string) => (
              <span
                className="mr-2 mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>
      <div className="mt-6 prose prose-lg text-gray-500">
        <ReactMarkdown
          components={customComponents}
          remarkPlugins={[remarkGfm]}
        >
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
