import { useState } from "react";
import { TextField, Button, Box, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const TodoInput = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        mb: 4,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <TextField
        label="Add a new task"
        variant="outlined"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        InputProps={{
          sx: { borderRadius: 2, bgcolor: "background.paper", boxShadow: 1 },
          endAdornment: (
            <InputAdornment position="end">
              <AddIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleAdd}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          boxShadow: 2,
          "&:hover": { boxShadow: 4, transform: "scale(1.02)" },
          transition: "0.2s",
        }}
        startIcon={<AddIcon />}
      >
      Task
      </Button>
    </Box>
  );
}
