import { Article } from "@/models";
import slugify from "slugify";
import axios from "axios";

// Token has very limited permissions (read-only),
// putting directly in code for now.
const token = "d1ae10a0f4b3be541b1a6d5580b8e0567c10ff4cf01bc3c7c274bca1d2b1da682b4858682f136be206ee137ccfbf47b2b343190f3ebce758f19e6f0fe252a65e61f8cdaba645d4c8b347a6005a14f475ad19509bf7554e896e2acd1c02d195364cdfa5a7d65861aa9e46eee296903bcf5a3d7405b351888cca9c41a519e2d908";

export const getArticles: () => Promise<Article[]> = async () => {
  const postResponse = await axios.get<{ data: {id: number, attributes: Article }[]}>("https://cms.hallb.me/api/posts", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const posts = postResponse.data.data.map(x => x.attributes);
  console.log(posts);

  return posts.map((article) => ({
    ...article,
    slug: slugify(article.title),
  }));
};

export const getArticle: (slug: string) => Promise<Article | null> = async (slug: string) => {
  const res = (await getArticles()).find((article) => article.slug == slug);

  return res ? res : null;
};
