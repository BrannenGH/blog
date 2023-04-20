import { articles } from "@/data/articles";
import { Article } from "@/models";
import slugify from "slugify";

export const getArticles: () => Article[] = () => {
  return articles.map((article) => ({
    ...article,
    slug: slugify(article.title),
  }));
};

export const getArticle: (slug: string) => Article | null = (slug: string) => {
  const res = getArticles().find((article) => article.slug == slug);

  return res ? res : null;
};
