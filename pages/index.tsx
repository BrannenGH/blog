import { Fragment } from "react";
import { ArticleTile } from "@/components/article/article-tile";
import { getArticles } from "@/services/article";
import { Article } from "@/models";

export async function getStaticProps() {
  return {
    // Passed to the page component as props
    props: { articles: getArticles() },
  };
}

const Home = ({ articles }: { articles: Article[] }) => {
  return (
    <Fragment>
      <h1 className="text-4xl font-bold mb-8 mb-6">Latest Articles</h1>
      {articles.map((article, i) => (
        <ArticleTile article={article} key={i} />
      ))}
    </Fragment>
  );
};

export default Home;
