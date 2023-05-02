import { it, expect, afterEach } from 'vitest';
import { cleanup, render, screen, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
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

it("renders inline code correctly", () => {
  const { container } = render(
    <Markdown text="`console.log('Test Code Block');`"/>
  );
  expect(container).toHaveTextContent(
    "console.log('Test Code Block');"
  );
});

it("renders code block correctly with info string", () => {
  const testText = `
\`\`\`bash
echo 'Test Code Block'
\`\`\`
`;
  const { container } = render(
    <Markdown text={testText}/>
  );

  expect(container).toHaveTextContent(
    "Test Code Block"
  );
});

const testText = `
\`\`\`javascript
function helloWorld() {
  console.log("Hello, world!");
}
\`\`\`
`;

it.only("renders code block correctly with info string", () => {
  const { container } = render(
    <Markdown text={testText}/>
  );

  expect(container).toHaveTextContent(
    "function helloWorld()"
  );
});