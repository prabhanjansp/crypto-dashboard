import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          background: {
            default: "#121212",
            paper: "#1d1d1d",
          },
        }
      : {}),
  },
});
