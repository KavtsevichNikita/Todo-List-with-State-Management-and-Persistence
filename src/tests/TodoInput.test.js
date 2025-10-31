import { render, screen, fireEvent } from "@testing-library/react";
import { TodoInput } from "../components/TodoInput";

describe("TodoInput Component", () => {
  test("renders input and add button", () => {
    render(<TodoInput onAdd={jest.fn()} />);
    const input = screen.getByLabelText(/add a new task/i);
    const button = screen.getByRole("button", { name: /task/i });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("calls onAdd when clicking button or pressing Enter", () => {
    const onAddMock = jest.fn();
    render(<TodoInput onAdd={onAddMock} />);
    const input = screen.getByLabelText(/add a new task/i);
    const button = screen.getByRole("button", { name: /task/i });

    // Добавление через кнопку
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);
    expect(onAddMock).toHaveBeenCalledWith("New Task");

    // Добавление через Enter
    fireEvent.change(input, { target: { value: "Enter Task" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(onAddMock).toHaveBeenCalledWith("Enter Task");
  });

  test("does not call onAdd for empty input", () => {
    const onAddMock = jest.fn();
    render(<TodoInput onAdd={onAddMock} />);
    const button = screen.getByRole("button", { name: /task/i });
    fireEvent.click(button);
    expect(onAddMock).not.toHaveBeenCalled();
  });
});
