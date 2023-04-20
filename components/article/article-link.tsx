import { Article } from "@/models";
import Link from "next/link";

export const ArticleLink = ({
  article,
  ...props
}: { article: Article } & any) => (
  <Link {...props} href={`/post/${article.slug}`} />
);
