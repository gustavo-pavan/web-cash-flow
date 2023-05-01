import { Box } from "@mui/system";
import React from "react";
import { ThemeContext } from "../components/theme";

export const Container: React.FC = () => {
  return (
    <ThemeContext>
      <Box>Test</Box>
    </ThemeContext>
  );
};
