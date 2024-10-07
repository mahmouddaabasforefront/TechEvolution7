import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import FizzBuzz from "../fizzBuzz";

describe("FizzBuzz Component", () => {
  it("should render a button to submit the input", () => {
    render(<FizzBuzz />);
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("should render Fizz for multiples of 3", async () => {
    render(<FizzBuzz />);
    const input = screen.getByPlaceholderText(/enter a number/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "3");
    await userEvent.click(button);

    expect(screen.getByText("Fizz")).toBeInTheDocument();
  });

  it("should render Fizz for multiples of 5", async () => {
    render(<FizzBuzz />);
    const input = screen.getByPlaceholderText(/enter a number/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "5");
    await userEvent.click(button);

    expect(screen.getByText("Buzz")).toBeInTheDocument();
  });

  it("should render Fizz for multiples of 3 and 5", async () => {
    render(<FizzBuzz />);
    const input = screen.getByPlaceholderText(/enter a number/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "15");
    await userEvent.click(button);

    expect(screen.getByText("FizzBuzz")).toBeInTheDocument();
  });

  it("should render 'invalid input' for negative numeric input", async () => {
    render(<FizzBuzz />);
    const input = screen.getByPlaceholderText(/enter a number/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "-1");
    await userEvent.click(button);

    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
  });

  it("should render 'ivalid input' when input is text", async () => {
    render(<FizzBuzz />);

    const input = screen.getByPlaceholderText(/enter a number/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "kanelbulle");
    await userEvent.click(button);

    expect(screen.queryByText(/kanelbulle/i)).not.toBeInTheDocument();
    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
  });

  it("should render 'FizzBuzz' when the input is 0", async () => {
    render(<FizzBuzz />);
    const input = screen.getByPlaceholderText(/enter a number/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "0");
    await userEvent.click(button);

    expect(screen.getByText("FizzBuzz")).toBeInTheDocument();
  });

  it("should render '1, 2, Fizz, 4, Buzz' when the input range is 1-5", async () => {
    render(<FizzBuzz />);
    const input = screen.getByPlaceholderText(/enter a number/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "1-5");
    await userEvent.click(button);

    expect(screen.getByText("1, 2, Fizz, 4, Buzz")).toBeInTheDocument();
  });

  it("should render 'Invalid input' when the input range is invalid", async () => {
    render(<FizzBuzz />);
    const input = screen.getByPlaceholderText(/enter a number/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "1.5");
    await userEvent.click(button);

    expect(screen.getByText("Invalid input")).toBeInTheDocument();
  });

  it("should render 'Invalid input' when the input range contains a negative number", async () => {
    render(<FizzBuzz />);
    const input = screen.getByPlaceholderText(/enter a number/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "-5-5");
    await userEvent.click(button);

    expect(screen.getByText("Invalid input")).toBeInTheDocument();
  });

  // TODO: Add tests for range of numbers
});
