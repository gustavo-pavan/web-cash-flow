import React from "react";
import { ThemeContext } from "../components/theme";
import { AppBar } from "../components/app-bar";
import { Drawer } from "../components/drawer";
import { Main } from "../components/main";
import { Snackbar } from "../components/snackbar";

interface Props {
  children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <ThemeContext>
      <AppBar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Drawer open={open} />
      <Main open={open}>
        {children}
        <Snackbar />
      </Main>
    </ThemeContext>
  );
};
