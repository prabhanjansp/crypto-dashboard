import { deepmerge } from "@mui/utils";

export const getDesignTokens = (mode) => {
  const commonSettings = {
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            transition: "0.3s ease",
          },
        },
      },
    },
  };

  const lightPalette = {
    palette: {
      mode,
      primary: {
        main: "#4a90e2",
      },
      background: {
        default: "#f4f6f8",
        paper: "#ffffff",
      },
      text: {
        primary: "#212121",
        secondary: "#555555",
      },
    },
  };

  const darkPalette = {
    palette: {
      mode,
      primary: {
        main: "#bb86fc",
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
      text: {
        primary: "#eeeeee",
        secondary: "#bbbbbb",
      },
    },
  };

  return deepmerge(commonSettings, mode === "light" ? lightPalette : darkPalette);
};