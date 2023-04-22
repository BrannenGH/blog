import { render, screen } from "@testing-library/react";
import { ArticleTile } from "..";
import { getArticles } from "@/services/article";

jest.mock("../../../services/article");

const sampleArticle = getArticles()[0];

it("renders the ArticleTile with correct content", () => {
  render(<ArticleTile article={sampleArticle} />);

  const title = screen.getByText(sampleArticle.title);
  expect(title).toBeInTheDocument();

  const author = screen.getByText(sampleArticle.author);
  expect(author).toBeInTheDocument();

  const date = screen.getByText(sampleArticle.date);
  expect(date).toBeInTheDocument();

  const contentPreview = screen.getByText(sampleArticle.contentPreview);
  expect(contentPreview).toBeInTheDocument();
});

it("renders the ArticleLink with correct href", () => {
  render(<ArticleTile article={sampleArticle} />);

  const link = screen.getByText("Read more");
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", `/post/${sampleArticle.slug}`);
});