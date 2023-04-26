import { Fragment } from "react";
import { ArticleTile, TextHeader } from "@/components";
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
      <TextHeader className="text-4xl font-bold mb-8 mb-6">
        Latest Articles
      </TextHeader>
      <div className="flex flex-col flex-wrap">
        {articles.map((article, i) => (
          <ArticleTile
            className="bg-mint-green-100 w-full md:w-1/3"
            article={article}
            key={i}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Home;
