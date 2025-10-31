# Todo App — React + Zustand + LocalStorage

A small Todo list application demonstrating modern React practices, external state management, persistence, and unit testing.

## Features

- React functional components with Hooks
- State management using **Zustand**
- State persisted to `localStorage` via Zustand `persist` middleware
- Completed tasks automatically move to the end of the list
- Filters: **All / Active / Completed**
- Unit tests for main components
- Responsive, accessible UI using Material UI

---

## Project Decisions & Rationale

- **Zustand**: lightweight, minimal boilerplate, ideal for small-to-medium apps without Redux overhead  
- **Persistence**: Zustand `persist` middleware keeps state synced with `localStorage` easily  
- **Component design**:  
  - `TodoInput` receives an `onAdd` prop, enabling easy isolated unit testing  
  - `TodoItem` and `TodoList` designed for separation of concerns and testability  
- **Task ordering**: active tasks always appear before completed tasks; relative order is preserved within each group  
- **Accessibility**: proper labels, `aria-*` attributes, and visible focus states  
- **Styling**: Material UI for responsive, clean, and minimal UI

---

## Available Scripts

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- The page reloads automatically when you make changes  
- Lint errors are shown in the console  

### `npm test`

Launches the test runner in interactive watch mode.  
All main components are covered: `TodoInput`, `TodoItem`, `TodoList`.

---

## How to Run Locally

1. Clone the repo and navigate into it:
   ```bash
   git clone <repo-url>
   cd <project-folder>

2. Install dependencies:

   npm install

3. Start development server:

   npm start

4. Run tests:

   npm test

---

## Folder Structure

my-todo-app/

    └─public/
        ├─ index.html
    └─src/
        ├─ components/
        │  ├─ TodoInput.jsx
        │  ├─ TodoItem.jsx
        │  └─ TodoList.jsx
        │  └─ NoTasks.jsx
        ├─ store/
        │  └─ store.js       # Zustand store
        ├─ variables/
        │  ├─ filters.js
        │  └─ text.js
        ├─ tests/
        │  ├─ TodoInput.test.js
        │  ├─ TodoItem.test.js
        │  └─ TodoList.test.js
        └─ App.js
        └─ index.js    
        └─ setupTests.js
    └─README.md
    └─.gitignore
    └─package.json
    └─package-lock.json
