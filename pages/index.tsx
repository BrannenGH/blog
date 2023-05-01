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
      <TextHeader className="text-center w-full md:text-left text-4xl font-bold mb-8 mb-6">
        Latest Articles
      </TextHeader>
      <div className="flex flex-col flex-wrap md:grid md:grid-cols-3 md:grid-gap-2">
        {articles.map((article, i) => (
          <ArticleTile
            className="bg-mint-green-100 w-full my-2 md:w-auto md:mx-2"
            article={article}
            key={i}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Home;
