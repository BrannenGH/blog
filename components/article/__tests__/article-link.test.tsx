import { it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

import { ArticleLink } from "..";
// Will eventually need mock data when using CMS
import { getArticles } from "@/services/article";

jest.mock("../../../services/article");

const sampleArticle = getArticles()[0];

it("renders the ArticleLink with correct href", () => {
  render(<ArticleLink article={sampleArticle}>Read more</ArticleLink>);

  const link = screen.getByText("Read more");
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", `/post/${sampleArticle.slug}`);
});

it("renders the ArticleLink with custom content", () => {
  render(
    <ArticleLink article={sampleArticle} data-testid="sampleArticleLink">
      <span>Custom content</span>
    </ArticleLink>
  );

  const link = screen.getByTestId("sampleArticleLink");
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", `/post/${sampleArticle.slug}`);
});

it("renders the ArticleLink with additional props", () => {
  render(
    <ArticleLink article={sampleArticle} data-testid="custom-test-id">
      Read more
    </ArticleLink>
  );

  const link = screen.getByTestId("custom-test-id");
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", `/post/${sampleArticle.slug}`);
});
