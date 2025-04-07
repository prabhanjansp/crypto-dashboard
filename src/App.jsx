import React, { useMemo, useState, lazy, Suspense, } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../theme";
import ThemeToggle from "./components/ThemeToggle";
import NewsFeed from "./components/NewsFeed";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";


// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const CoinDetail = lazy(() => import("./pages/CoinDetail"));

function App() {
  // 🔁 Load theme mode from localStorage or default to light
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode ? savedMode : "light";
  });

  // 🔁 Persist theme mode to localStorage
  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
  
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Crypto Dashboard
              </Typography>

              <Button
                color="inherit"
                component={RouterLink}
                to="/"
                sx={{ textTransform: "none", fontWeight: 500 }}
              >
                Home
              </Button>

              <Button
                color="inherit"
                component={RouterLink}
                to="/news"
                sx={{ textTransform: "none", fontWeight: 500 }}
              >
                News
              </Button>

              <ThemeToggle mode={mode} toggleMode={toggleMode} />
            </Toolbar>
          </AppBar>

          <Suspense
            fallback={
              <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coin/:id" element={<CoinDetail />} />
              <Route path="/news" element={<NewsFeed />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
 
  );
}

export default App;
