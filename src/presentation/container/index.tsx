import { Box } from "@mui/system";
import React from "react";
import { ThemeContext } from "../components/theme";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AppBar } from "../components/app-bar";
import { useTheme } from "@mui/material/styles";
import { Drawer } from "../components/drawer";

export const Container: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(!open);
    };

  return (
    <ThemeContext>
       <AppBar handleDrawerOpen={handleDrawerOpen} open={open} />
       <Drawer open={open} />

      <Box></Box>
    </ThemeContext>
  );
};
