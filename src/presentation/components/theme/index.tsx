import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const ThemeContext: React.FC<Props> = ({ children }) => {
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: "#7c4dff",
              light: "#212946",
              dark: "#6f3bff",
              medium: "rgb(189, 200, 240)",
            },
            secondary: {
              main: "#1e88e5",
            },
            background: {
              paper: "#1a223f",
              default: "#111936",
            },
            success: {
              main: "#03DAC5",
            },
            text: {
              primary: "rgb(215, 220, 236)",
              secondary: "rgb(189, 200, 240)",
            },
          }
        : {
            primary: {
              main: "#7c4dff",
              light: "#FFFFFF",
              contrastText: "rgba(0,0,0,0.4)",
            },
            secondary: {
              main: "#1e88e5",
            },
            background: {
              paper: "#eef2f6",
              default: "#ffffff",
            },
          }),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "",
          },
          "::-webkit-scrollbar": {
            width: "0.2em",
          },
          "::-webkit-scrollbar-track": {
            margin: "8px 0",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.2)",
            outline: "1px solid transparent",
            borderRadius: "8px",
          },
          "::-webkit-calendar-picker-indicator": {
            filter: mode === "dark" ? 
            "invert(100%) sepia(16%) saturate(7496%) hue-rotate(182deg) brightness(121%) contrast(91%) opacity(40%)" 
            : " invert(0%) sepia(100%) saturate(7460%) hue-rotate(59deg) brightness(105%) contrast(111%) opacity(40%)" 
          },
        },
      },
    },
  });

  const [mode, setMode] = React.useState<PaletteMode>("dark");

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <React.Fragment>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.Fragment>
  );
};

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {
    // This is intentional
  },
});
