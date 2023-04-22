import { Article } from "@/models";
import { ArticleLink } from "./article-link";

/**
 * Displays a summary of an article, including its title, author, date, and preview. 
 * It also includes a link to the full article.
 *
 * @component
 * @param {Object} props
 * @param {Article} props.article - The article to display in the tile
 */
export const ArticleTile = ({ article }: { article: Article }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800">{article.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{article.author}</p>
        <p className="text-sm text-gray-600">{article.date}</p>
        <p className="text-sm text-gray-600 mb-4">{article.contentPreview}</p>
        <ArticleLink article={article}>Read more</ArticleLink>
      </div>
    </div>
  );
};
