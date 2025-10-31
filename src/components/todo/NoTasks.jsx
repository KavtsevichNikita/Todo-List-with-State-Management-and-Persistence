import { Typography, Box } from "@mui/material";

export const NoTasks = ({ text }) => {
  return (
    <Box sx={{ py: 5, textAlign: "center" }}>
      <Typography variant="body1" color="text.secondary" sx={{ fontStyle: "italic" }}>
        {text}
      </Typography>
    </Box>
  );
}
