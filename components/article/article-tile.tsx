import { Article } from "@/models";
import { ArticleLink } from "./article-link";
import { TextHeader, Button, Text } from "..";

/**
 * Displays a summary of an article, including its title, author, date, and preview.
 * It also includes a link to the full article.
 *
 * @component
 * @param {Object} props
 * @param {Article} props.article - The article to display in the tile
 */
export const ArticleTile = ({
  article,
  className,
  ...props
}: { article: Article } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => {
  return (
    <div
      {...props}
      className={`border rounded-lg overflow-hidden shadow-md ${
        className ?? ""
      }`}
    >
      <div className="p-4">
        <TextHeader
          component={(props: any) => <h3 {...props} />}
          className="text-lg font-medium text-gray-800"
        >
          {article.title}
        </TextHeader>
        <Text className="text-sm text-gray-600 mb-2">{article.author}</Text>
        <Text className="text-sm text-gray-600">{article.date}</Text>
        <Text className="text-sm text-gray-600 mb-4">{article.contentPreview}</Text>
        <Button
          component={(props: any) => (
            <ArticleLink {...props} article={article} />
          )}
        >
          Read more
        </Button>
      </div>
    </div>
  );
};
