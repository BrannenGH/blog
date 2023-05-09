export type RawArticle = {
  title: string;
  author: string;
  published: string;
  content: string;
  summary: string;
  tags: string[];
};

export type Article = RawArticle & {
  slug: string;
};
