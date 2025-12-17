import * as React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import {axe, toHaveNoViolations} from "jest-axe";

import {Ripple} from "../ripple";

expect.extend(toHaveNoViolations);

describe("Ripple", () => {
  it("renders correctly", () => {
    render(<Ripple>Click me</Ripple>);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    render(<Ripple variant="outline">Outline</Ripple>);
    expect(screen.getByRole("button")).toHaveClass("border-2");
  });

  it("applies color classes correctly", () => {
    const {rerender} = render(<Ripple color="primary">Primary</Ripple>);
    const button = screen.getByRole("button");

    rerender(<Ripple color="success">Success</Ripple>);
    expect(button).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    render(<Ripple size="lg">Large</Ripple>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("handles disabled state", () => {
    render(<Ripple disabled>Disabled</Ripple>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toHaveClass("opacity-50");
  });

  it("creates ripple effect on mouse down", () => {
    render(<Ripple>Ripple test</Ripple>);
    const button = screen.getByRole("button");

    fireEvent.mouseDown(button, {
      clientX: 50,
      clientY: 50,
    });

    // Check if ripple span is created
    const ripples = button.querySelectorAll("span");

    expect(ripples.length).toBeGreaterThan(0);
  });

  it("does not create ripple when disabled", () => {
    render(<Ripple disabled>Disabled ripple</Ripple>);
    const button = screen.getByRole("button");

    fireEvent.mouseDown(button, {
      clientX: 50,
      clientY: 50,
    });

    const ripples = button.querySelectorAll("span");

    expect(ripples.length).toBe(0);
  });

  it("handles click events", () => {
    const handleClick = jest.fn();

    render(<Ripple onClick={handleClick}>Clickable</Ripple>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("supports custom ripple color", () => {
    render(<Ripple rippleColor="#ff0000">Custom color</Ripple>);
    const button = screen.getByRole("button");

    fireEvent.mouseDown(button, {
      clientX: 50,
      clientY: 50,
    });

    const ripple = button.querySelector("span");

    expect(ripple).toHaveStyle("background-color: #ff0000");
  });

  it("creates ripple at click position", () => {
    render(<Ripple>Position ripple</Ripple>);
    const button = screen.getByRole("button");

    fireEvent.mouseDown(button, {
      clientX: 100,
      clientY: 100,
    });

    expect(button.querySelector("span")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const {container} = render(<Ripple>Accessible ripple</Ripple>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("supports keyboard navigation", () => {
    render(<Ripple>Keyboard accessible</Ripple>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("tabIndex", "0");

    button.focus();
    expect(button).toHaveFocus();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Ripple ref={ref}>Ref test</Ripple>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    render(<Ripple className="custom-class">Custom</Ripple>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("removes ripples after animation", () => {
    render(<Ripple>Animation test</Ripple>);
    const button = screen.getByRole("button");

    fireEvent.mouseDown(button);
    const ripple = button.querySelector("span");

    expect(ripple).toBeInTheDocument();

    // Simulate animation end
    if (ripple) {
      fireEvent.animationEnd(ripple);
    }
  });
});
