import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "../components/TodoList";
import { useTodoStore } from "../store/store.js";

// Мокаем store
jest.mock("../store/store.js", () => ({
  useTodoStore: jest.fn(),
}));


describe("TodoList Component", () => {
  const toggleTaskMock = jest.fn();
  const deleteTaskMock = jest.fn();
  const clearCompletedMock = jest.fn();

  const tasksMock = [
    { id: 1, text: "Task 1", completed: false, createdAt: new Date().toISOString() },
    { id: 2, text: "Task 2", completed: true, createdAt: new Date().toISOString() },
  ];

  beforeEach(() => {
    useTodoStore.mockImplementation((selector) => {
      if (selector.toString().includes("tasks")) return tasksMock;
      if (selector.toString().includes("toggleTask")) return toggleTaskMock;
      if (selector.toString().includes("deleteTask")) return deleteTaskMock;
      if (selector.toString().includes("clearCompleted")) return clearCompletedMock;
      return undefined;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders tasks and buttons", () => {
    render(<TodoList />);
    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/task 2/i)).toBeInTheDocument();
    expect(screen.getByText(/1 task left/i)).toBeInTheDocument();
    expect(screen.getByText("Clear Completed")).toBeInTheDocument();
  });

  test("filters completed tasks", () => {
    render(<TodoList />);
    fireEvent.click(screen.getByText("Completed")); // исправлено
    expect(screen.queryByText(/task 1/i)).toBeNull();
    expect(screen.getByText(/task 2/i)).toBeInTheDocument();
  });

  test("filters active tasks", () => {
    render(<TodoList />);
    fireEvent.click(screen.getByText("Active"));
    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/task 2/i)).toBeNull();
  });

  test("clear completed calls store function", () => {
    render(<TodoList />);
    fireEvent.click(screen.getByText("Clear Completed"));
    expect(clearCompletedMock).toHaveBeenCalled();
  });

  test("toggle task calls store function", () => {
    render(<TodoList />);
    const checkbox = screen.getByLabelText("toggle-1");
    fireEvent.click(checkbox);
    expect(toggleTaskMock).toHaveBeenCalledWith(1);
  });

  test("delete task calls store function", () => {
    render(<TodoList />);
    const deleteButton = screen.getByLabelText("delete-1");
    fireEvent.click(deleteButton);
    expect(deleteTaskMock).toHaveBeenCalledWith(1);
  });
});
