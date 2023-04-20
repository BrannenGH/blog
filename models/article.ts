export type RawArticle = {
  title: string;
  author: string;
  date: string;
  content: string;
  contentPreview: string;
  tags: string[];
};

export type Article = RawArticle & {
  slug: string;
};
