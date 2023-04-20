import { DependencyList, EffectCallback, useEffect } from "react";
import { getArticle, getArticles } from "./article-client";
import { RawArticle } from "@/models";

export const hydrateArticles = () => {
  return { props: { articles: getArticles() } };
};

export const hydrateArticle = (slug: string) => {
  return { props: { article: getArticle(slug) } };
};
