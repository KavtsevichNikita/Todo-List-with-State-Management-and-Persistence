import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export const useTodoStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (text) => {
        const task = { id: nanoid(), text: text.trim(), completed: false, createdAt: Date.now() };
        if (!task.text) return;
        set((state) => ({ tasks: [task, ...state.tasks] }));
      },
      toggleTask: (id) => set((state) => {
        const tasks = state.tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
        const active = tasks.filter(task => !task.completed);
        const completed = tasks.filter(task => task.completed);
        return { tasks: [...active, ...completed] };
      }),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter(task => task.id !== id) })),
      clearCompleted: () => set((state) => ({ tasks: state.tasks.filter(task => !task.completed) })),
      setTasks: (tasks) => set({ tasks })
    }),
    { name: "todo-zustand-storage", getStorage: () => localStorage }
  )
);
