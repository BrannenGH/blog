import { it, expect, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { TextHeader } from "..";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

it("renders h1 header with default styles", () => {
  const { getByText } = render(<TextHeader>Test Heading 1</TextHeader>);
  expect(getByText("Test Heading 1")).toHaveClass("text-4xl");
});

it("renders h2 header with custom styles", () => {
  const { getByText } = render(
    <TextHeader level={2} className="my-custom-class">
      Test Heading 2
    </TextHeader>
  );
  expect(getByText("Test Heading 2")).toHaveClass("text-3xl");
  expect(getByText("Test Heading 2")).toHaveClass("my-custom-class");
});

it("renders h3 header with custom component", () => {
  const CustomH3 = ({ children, ...props }: any) => (
    <h3 className="my-custom-h3" {...props}>
      {children}
    </h3>
  );
  const { getByText } = render(
    <TextHeader level={3} component={CustomH3}>
      Test Heading 3
    </TextHeader>
  );
  expect(getByText("Test Heading 3")).toHaveClass("my-custom-h3");
});
