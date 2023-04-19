/**
 * A first blog post for the new blog format
 * Will eventually come from a CMS.
 */

import Highlight, { defaultProps } from "prism-react-renderer";
import { Fragment } from "react";
import { ReactMarkdown } from "react-markdown";
import { articles } from "@/data/articles";

const article = articles[0];

export default function FilterTestPlanAdo() {
  return (
    <Fragment>
      <h1>{article.title}</h1>
      <ReactMarkdown>
        {article.}
      </ReactMarkdown>
      <Highlight {...defaultProps} code={exampleCode} language="yaml">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Fragment>
  );
}
