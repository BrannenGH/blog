import React from "react";
import { render } from "@testing-library/react";
import { Markdown } from "..";

it("renders h1 header correctly", () => {
  const { getByText } = render(<Markdown text="# Test Heading 1" />);
  expect(getByText("Test Heading 1")).toHaveClass("text-4xl");
});

it("renders h2 header correctly", () => {
  const { getByText } = render(<Markdown text="## Test Heading 2" />);
  expect(getByText("Test Heading 2")).toHaveClass("text-3xl");
});

it("renders h3 header correctly", () => {
  const { getByText } = render(<Markdown text="### Test Heading 3" />);
  expect(getByText("Test Heading 3")).toHaveClass("text-2xl");
});

it("renders h4 header correctly", () => {
  const { getByText } = render(<Markdown text="#### Test Heading 4" />);
  expect(getByText("Test Heading 4")).toHaveClass("text-xl");
});

it("renders h5 header correctly", () => {
  const { getByText } = render(<Markdown text="##### Test Heading 5" />);
  expect(getByText("Test Heading 5")).toHaveClass("text-lg");
});

it("renders h6 header correctly", () => {
  const { getByText } = render(<Markdown text="###### Test Heading 6" />);
  expect(getByText("Test Heading 6")).toHaveClass("text-base");
});

it("renders link correctly", () => {
  const { getByText } = render(
    <Markdown text="[Test Link](https://test.com)" />
  );
  expect(getByText("Test Link")).toHaveAttribute(
    "href",
    "https://test.com"
  );
});

it("renders code block correctly", () => {
  const { getByText } = render(
    <Markdown text="```\nconsole.log('Test Code Block');\n```" />
  );
  expect(getByText("console.log('Test Code Block');")).toHaveClass(
    "code"
  );
});