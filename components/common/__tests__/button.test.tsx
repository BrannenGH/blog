import { it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
import { Button } from "..";

it("renders button with text", () => {
  const { getByText } = render(<Button>Test Button</Button>);
  expect(getByText("Test Button")).toBeInTheDocument();
});

it("handles click event", () => {
  const handleClick = vi.fn();
  const { getByText } = render(<Button onClick={handleClick}>Click Me</Button>);

  fireEvent.click(getByText("Click Me"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("applies additional props and attributes", () => {
  const { getByTestId } = render(
    <Button data-testid="test-button" disabled>
      Disabled Button
    </Button>
  );

  const button = getByTestId("test-button");
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();
});
