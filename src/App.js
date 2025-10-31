import React from "react";
import { Container, Typography, Box, Paper, AppBar, Toolbar, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { useTodoStore } from "./store/store";

export default function App() {
  const addTask = useTodoStore((s) => s.addTask);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#f0f2f5" }}>
      <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              My Todo App
            </Typography>
          </Box>
          <Box>
          <Button
            onClick={() => window.open('https://github.com/KavtsevichNikita/Todo-List-with-State-Management-and-Persistence', '_blank')}
            color="inherit"
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 6, flex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Todo List with State Management and Persistence
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Add tasks, mark them as completed, filter, and manage your daily tasks. All tasks are persisted in your browser.
          </Typography>
        </Box>
        <Container maxWidth="xl">
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 6 }}>
            <TodoInput onAdd={addTask} />
            <TodoList />
          </Paper>
        </Container>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 4,
          mt: "auto",
          bgcolor: "primary.dark",
          color: "primary.contrastText",
          textAlign: "center",
          boxShadow: 3,
        }}
      >
        <Typography variant="body2" gutterBottom>
          © 2025 My Todo App. Built with React & Material-UI.
        </Typography>
      </Box>
    </Box>
  );
}