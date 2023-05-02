import { it, expect, afterEach } from 'vitest';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
import { Drawer } from "..";

it("renders drawer with hide prop as false", () => {
  const { getByTestId } = render(
    <Drawer data-testid="test-drawer">Drawer Content</Drawer>
  );
  expect(getByTestId("test-drawer")).toBeInTheDocument();
  expect(getByTestId("test-drawer")).toHaveClass("left-0");
});

it("renders drawer with hide prop as true", () => {
  const { queryByTestId } = render(
    <Drawer hide data-testid="test-drawer">
      Drawer Content
    </Drawer>
  );
  expect(queryByTestId("test-drawer")).not.toBeInTheDocument();
});

it("handles onTransitionEnd event", async () => {
  const { getByTestId, queryByTestId, rerender } = render(
    <Drawer data-testid="test-drawer">Drawer Content</Drawer>
  );

  const drawer = getByTestId("test-drawer");
  expect(drawer).toBeInTheDocument();
  expect(drawer).toHaveClass("left-0");

  // Simulate setting hide to true
  rerender(
    <Drawer hide data-testid="test-drawer">
      Drawer Content
    </Drawer>
  );

  // Simulate the transition end event
  fireEvent.transitionEnd(drawer);

  await waitFor(() =>
    expect(queryByTestId("test-drawer")).not.toBeInTheDocument()
  );
});
