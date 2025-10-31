import { useState } from "react";
import { Box, Button, ButtonGroup, Typography, Stack } from "@mui/material";
import { TodoItem } from "./TodoItem";
import { NoTasks } from "./NoTasks";
import { useTodoStore } from "../store/store.js";
import { TODO_MESSAGES } from "../variables/text.js"
import { FILTERS, FILTER_LABELS } from "../variables/filters.js";

export const TodoList = () => {
  const tasks = useTodoStore((s) => s.tasks);
  const toggleTask = useTodoStore((s) => s.toggleTask);
  const deleteTask = useTodoStore((s) => s.deleteTask);
  const clearCompleted = useTodoStore((s) => s.clearCompleted);

  const [filter, setFilter] = useState(FILTERS.ALL);

  const filteredTasks = tasks.filter((task) => {
    if (filter === FILTERS.ACTIVE) return !task.completed;
    if (filter === FILTERS.COMPLETED) return task.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <ButtonGroup variant="outlined" color="primary">
          {Object.values(FILTERS).map((key) => (
            <Button
              key={key}
              onClick={() => setFilter(key)}
              variant={filter === key ? "contained" : "outlined"}
            >
              {FILTER_LABELS[key]}
            </Button>
          ))}
        </ButtonGroup>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
          <Typography variant="body2" color="text.secondary">
            {TODO_MESSAGES.TASKS_LEFT(activeCount)}
          </Typography>
          <Button color="error" variant="outlined" onClick={clearCompleted}>
            Clear Completed
          </Button>
        </Box>
      </Box>

      {/* Task List */}
      <Stack spacing={2}>
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <Box
              key={task.id}
              elevation={3}
              sx={{
                p: 1.5,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <TodoItem task={task} onToggle={toggleTask} onDelete={deleteTask} />
            </Box>
          ))
        ) : (
          <NoTasks text={TODO_MESSAGES.NO_TASKS} />
        )}
      </Stack>
    </>
  );
}
