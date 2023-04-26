import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "..";

it("renders button with text", () => {
  const { getByText } = render(<Button>Test Button</Button>);
  expect(getByText("Test Button")).toBeInTheDocument();
});

it("handles click event", () => {
  const handleClick = jest.fn();
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
