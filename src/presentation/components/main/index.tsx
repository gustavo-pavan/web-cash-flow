import React from "react";
import { Box } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

interface Props {
  open: boolean;
  children: React.ReactNode;
}

const drawerWidth = 240;

const Container = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  marginTop: "84px",
  paddingRight: 27,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  padding: "0 12px",
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
  }),
}));

export const Main: React.FC<Props> = ({ open, children }) => {
  const theme = useTheme();
  return (
    <Container open={open}>
      <Box
        sx={{
          background: theme.palette.background.paper,
          borderRadius: "8px",
          height: "calc(100vh - 84px)",
          boxSizing: "border-box",
          padding: 2,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};
