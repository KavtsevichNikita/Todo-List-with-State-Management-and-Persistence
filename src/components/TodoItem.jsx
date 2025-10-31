import { Checkbox, IconButton, ListItemText, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const TodoItem = ({ task, onToggle, onDelete }) => {
  const createdAt = new Date(task.createdAt).toLocaleString();

  return (
    <Box
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1.5,
        mb: 1.5,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          color="primary"
          inputProps={{ "aria-label": `toggle-${task.id}` }}
        />
        <ListItemText
          primary={task.text}
          sx={{
            ml: 1,
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "text.secondary" : "text.primary",
            fontSize: "1rem",
            fontWeight: 500,
          }}
        />
      </Box>

      {/* Дата создания */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ ml: 2, whiteSpace: "nowrap" }}
      >
        {createdAt}
      </Typography>

      <IconButton
        edge="end"
        onClick={() => onDelete(task.id)}
        aria-label={`delete-${task.id}`}
        title="Delete task"
        sx={{
          ml: 2,
          "&:hover": {
            bgcolor: "rgba(255, 0, 0, 0.1)",
          },
        }}
      >
        <DeleteIcon color="error" />
      </IconButton>
    </Box>
  );
};
