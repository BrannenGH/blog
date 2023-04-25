import { Article } from "@/models";
import Link from "next/link";

/**
 * Link to an article.
 *
 * @component
 * @param {Object} props
 * @param {Article} props.article - The target article for the link
 */
export const ArticleLink = ({
  article,
  ...props
}: { article: Article } & any) => (
  <Link {...props} href={`/post/${article.slug}`} />
);
