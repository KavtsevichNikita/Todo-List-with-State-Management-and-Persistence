import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "../components/TodoItem";

const taskMock = {
  id: 1,
  text: "Test Task",
  completed: false,
  createdAt: new Date().toISOString(),
};

describe("TodoItem Component", () => {
  test("renders task text and checkbox", () => {
    render(<TodoItem task={taskMock} onToggle={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText(/test task/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  test("calls onToggle when checkbox is clicked", () => {
    const onToggleMock = jest.fn();
    render(<TodoItem task={taskMock} onToggle={onToggleMock} onDelete={jest.fn()} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(onToggleMock).toHaveBeenCalledWith(taskMock.id);
  });

  test("calls onDelete when delete button is clicked", () => {
    const onDeleteMock = jest.fn();
    render(<TodoItem task={taskMock} onToggle={jest.fn()} onDelete={onDeleteMock} />);
    const button = screen.getByLabelText(`delete-${taskMock.id}`);
    fireEvent.click(button);
    expect(onDeleteMock).toHaveBeenCalledWith(taskMock.id);
  });

  test("shows createdAt date", () => {
    render(<TodoItem task={taskMock} onToggle={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText(new Date(taskMock.createdAt).toLocaleString())).toBeInTheDocument();
  });
});
