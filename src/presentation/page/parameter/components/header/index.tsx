import { Paper, Typography, useTheme } from "@mui/material";
import React from "react";

export const Header: React.FC = () => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        height: 70,
        background: theme.palette.background.default,
        padding: 2,
        paddingLeft: 4,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        marginBottom: 2,
      }}
    >
      <Typography
        variant="h6"
        component="span"
        sx={{ color: theme.palette.text.secondary }}
      >
        Parameters
      </Typography>
    </Paper>
  );
};
