import { render } from "@testing-library/react";
import { Code } from "..";

it("renders code as inline", () => {
  const code = `const hello = "world";`;
  const { getByTestId } = render(<Code language="tsx" code={code} data-testid="code-block"/>);
  const codeElement = getByTestId("code-block");
  expect(codeElement).toBeInTheDocument();
  expect(codeElement?.tagName).toEqual("CODE");
  expect(codeElement?.getAttribute("class")).toContain("font-mono");
});

it("renders code as block", () => {
  const code = `const hello = "world";`;
  const { getByTestId } = render(<Code language="tsx" code={code} block data-testid="code-block" />);
  const codeElement = getByTestId("code-block");
  expect(codeElement).toBeInTheDocument();
  expect(codeElement?.tagName).toEqual("CODE");
  expect(codeElement?.getAttribute("class")).toContain("font-mono");
  expect(codeElement?.getAttribute("class")).toContain("block");
});

it("applies additional class names to code elements", () => {
  const code = `const hello = "world";`;
  const className = "my-custom-class";
  const { getByTestId } = render(<Code language="tsx" code={code} className={className} data-testid="code-block" />);
  const codeElement = getByTestId("code-block");
  expect(codeElement).toBeInTheDocument();
  expect(codeElement?.getAttribute("class")).toContain("font-mono");
  expect(codeElement?.getAttribute("class")).toContain(className);
});

it("applies additional class names to block code elements", () => {
  const code = `const hello = "world";`;
  const className = "my-custom-class";
  const { getByTestId } = render(<Code language="tsx" code={code} block className={className} data-testid="code-block"/>);
  const codeElement = getByTestId("code-block");
  expect(codeElement).toBeInTheDocument();
  expect(codeElement?.getAttribute("class")).toContain("font-mono");
  expect(codeElement?.getAttribute("class")).toContain("block");
  expect(codeElement?.getAttribute("class")).toContain(className);
});