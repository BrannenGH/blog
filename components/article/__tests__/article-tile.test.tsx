import { it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { ArticleTile } from "..";
import { getArticles } from "@/services/article";

expect.extend(matchers);

vi.mock("../../../services/article");

afterEach(() => {
  cleanup();
});

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
