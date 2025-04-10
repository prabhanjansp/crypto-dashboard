// // import React, { useMemo, useState, lazy, Suspense, } from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import {
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   ThemeProvider,
// //   CssBaseline,
// //   CircularProgress,
// // } from "@mui/material";
// // import { createTheme } from "@mui/material/styles";
// // import { getDesignTokens } from "../theme";
// // import ThemeToggle from "./components/ThemeToggle";
// // import NewsFeed from "./components/NewsFeed";
// // import { Link as RouterLink } from "react-router-dom";
// // import { Button } from "@mui/material";

// // // Lazy load pages
// // const Home = lazy(() => import("./pages/Home"));
// // const CoinDetail = lazy(() => import("./pages/CoinDetail"));

// // function App() {
// //   // 🔁 Load theme mode from localStorage or default to light
// //   const [mode, setMode] = useState(() => {
// //     const savedMode = localStorage.getItem("themeMode");
// //     return savedMode ? savedMode : "light";
// //   });

// //   // 🔁 Persist theme mode to localStorage
// //   const toggleMode = () => {
// //     const newMode = mode === "light" ? "dark" : "light";
// //     setMode(newMode);
// //     localStorage.setItem("themeMode", newMode);
// //   };

// //   const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

// //   return (

// //       <ThemeProvider theme={theme}>
// //         <CssBaseline />
// //         <Router>
// //           <AppBar position="static">
// //             <Toolbar>
// //               <Typography variant="h6" sx={{ flexGrow: 1 }}>
// //                 Crypto Dashboard
// //               </Typography>

// //               <Button
// //                 color="inherit"
// //                 component={RouterLink}
// //                 to="/"
// //                 sx={{ textTransform: "none", fontWeight: 500 }}
// //               >
// //                 Home
// //               </Button>

// //               <Button
// //                 color="inherit"
// //                 component={RouterLink}
// //                 to="/news"
// //                 sx={{ textTransform: "none", fontWeight: 500 }}
// //               >
// //                 News
// //               </Button>

// //               <ThemeToggle mode={mode} toggleMode={toggleMode} />
// //             </Toolbar>
// //           </AppBar>

// //           <Suspense
// //             fallback={
// //               <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
// //             }
// //           >
// //             <Routes>
// //               <Route path="/" element={<Home />} />
// //               <Route path="/coin/:id" element={<CoinDetail />} />
// //               <Route path="/coins/:id" element={<CoinDetail />} />

// //               <Route path="/news" element={<NewsFeed />} />
// //             </Routes>
// //           </Suspense>
// //         </Router>
// //       </ThemeProvider>

// //   );
// // }

// // export default App;
// import React, { useMemo, useState, lazy, Suspense } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link as RouterLink,
// } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   ThemeProvider,
//   CssBaseline,
//   CircularProgress,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Divider,
//   Box,
//   useMediaQuery,
// } from "@mui/material";
// import { createTheme } from "@mui/material/styles";
// import { getDesignTokens } from "../theme";
// import ThemeToggle from "./components/ThemeToggle";
// import NewsFeed from "./components/NewsFeed";
// import MenuIcon from "@mui/icons-material/Menu";
// import HomeIcon from "@mui/icons-material/Home";
// import BookIcon from "@mui/icons-material/Book";
// import NewspaperIcon from "@mui/icons-material/Newspaper";
// import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
// import StarRoundedIcon from "@mui/icons-material/StarRounded";
// import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
// import Watchlist from "./pages/Watchlist";

// const Home = lazy(() => import("./pages/Home"));
// const CoinDetail = lazy(() => import("./pages/CoinDetail"));

// function App() {
//   const [mode, setMode] = useState(
//     () => localStorage.getItem("themeMode") || "light"
//   );
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const isMobile = useMediaQuery("(max-width:600px)");

//   const toggleMode = () => {
//     const newMode = mode === "light" ? "dark" : "light";
//     setMode(newMode);
//     localStorage.setItem("themeMode", newMode);
//   };

//   const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

//   const handleDrawerToggle = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const drawer = (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={handleDrawerToggle}
//       onKeyDown={handleDrawerToggle}
//     >
//       <List>
//         <ListItem
//           button
//           component={RouterLink}
//           to="/"
//           sx={{
//             color: theme.palette.text.primary,
//             textDecoration: "none",
//           }}
//         >
//           <ListItemIcon sx={{ color: theme.palette.text.primary }}>
//             <HomeIcon />
//           </ListItemIcon>
//           <ListItemText primary="Home" />
//         </ListItem>

//         <ListItem
//           button
//           component={RouterLink}
//           to="/news"
//           sx={{
//             color: theme.palette.text.primary,
//             textDecoration: "none",
//           }}
//         >
//           <ListItemIcon sx={{ color: theme.palette.text.primary }}>
//             <NewspaperIcon />
//           </ListItemIcon>
//           <ListItemText primary="News" />
//         </ListItem>
//         <ListItem
//           button
//           component={RouterLink}
//           to="/watchlist"
//           sx={{
//             color: theme.palette.text.primary,
//             textDecoration: "none",
//           }}
//         >
//           <ListItemIcon sx={{ color: theme.palette.text.primary }}>
//             <BookIcon />
//           </ListItemIcon>
//           <ListItemText primary="Watchlist" />
//         </ListItem>
//       </List>

//       <Divider />

//       <Box sx={{ p: 2 }}>
//         <ThemeToggle mode={mode} toggleMode={toggleMode} />
//       </Box>
//     </Box>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <AppBar position="static">
//           <Toolbar
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               background:
//                 "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
//             }}
//           >
//             <Box display="flex" alignItems="center">
//               <CurrencyBitcoinIcon sx={{ mr: 1 }} />
//               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                 Crypto Dashboard
//               </Typography>
//             </Box>

//             {isMobile ? (
//               <>
//                 <IconButton
//                   color="inherit"
//                   edge="end"
//                   onClick={handleDrawerToggle}
//                 >
//                   <MenuIcon />
//                 </IconButton>
//               </>
//             ) : (
//               <Box display="flex" alignItems="center" gap={2}>
//   <Typography
//     component={RouterLink}
//     to="/"
//     sx={{
//       color: "#fff",
//       textDecoration: "none",
//       fontWeight: 500,
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       gap: 0.5,
//     }}
//   >
//     <HomeRoundedIcon fontSize="small" />
//     Home
//   </Typography>

//   <Typography
//     component={RouterLink}
//     to="/news"
//     sx={{
//       color: "#fff",
//       textDecoration: "none",
//       fontWeight: 500,
//       display: "flex",
//       flexDirection: "column",

//       alignItems: "center",
//       gap: 0.5,
//     }}
//   >
//     <ArticleRoundedIcon fontSize="small" />
//     News
//   </Typography>

//   <Typography
//     component={RouterLink}
//     to="/watchlist"
//     sx={{
//       color: "#fff",
//       textDecoration: "none",
//       fontWeight: 500,
//       display: "flex",
//       flexDirection: "column",

//       alignItems: "center",
//       gap: 0.5,
//     }}
//   >
//     <StarRoundedIcon fontSize="small" />
//     Watchlist
//   </Typography>

//   <ThemeToggle mode={mode} toggleMode={toggleMode} />
// </Box>
//             )}
//           </Toolbar>
//         </AppBar>

//         <Drawer
//           anchor="right"
//           open={drawerOpen}
//           onClose={handleDrawerToggle}
//           PaperProps={{
//             sx: {
//               backgroundColor: theme.palette.background.default,
//               color: theme.palette.text.primary,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>

//         <Suspense
//           fallback={
//             <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
//           }
//         >
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/coin/:id" element={<CoinDetail />} />
//             <Route path="/coins/:id" element={<CoinDetail />} />
//             <Route path="/watchlist" element={<Watchlist />} />

//             <Route path="/news" element={<NewsFeed />} />
//           </Routes>
//         </Suspense>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;
import React, { useMemo, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
  CircularProgress,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  useMediaQuery,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../theme";
import ThemeToggle from "./components/ThemeToggle";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";


const Home = lazy(() => import("./pages/Home"));
const CoinDetail = lazy(() => import("./pages/CoinDetail"));
const NewsFeed = lazy(() => import("./components/NewsFeed"));
const Watchlist = lazy(() => import("./pages/Watchlist"));

function App() {
  const [mode, setMode] = useState(
    () => localStorage.getItem("themeMode") || "light"
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <ListItem button component={RouterLink} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/news">
          <ListItemIcon>
            <NewspaperIcon />
          </ListItemIcon>
          <ListItemText primary="News" />
        </ListItem>
        <ListItem button component={RouterLink} to="/watchlist">
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Watchlist" />
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <ThemeToggle mode={mode} toggleMode={toggleMode} />
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              background:
                "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
            }}
          >
            <Box display="flex" alignItems="center">
              <CurrencyBitcoinIcon sx={{ mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Crypto Dashboard
              </Typography>
            </Box>

            {isMobile ? (
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box display="flex" alignItems="center" gap={2}>
                <Typography
                  component={RouterLink}
                  to="/"
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 500,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <HomeRoundedIcon fontSize="small" />
                  Home
                </Typography>

                <Typography
                  component={RouterLink}
                  to="/news"
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 500,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <ArticleRoundedIcon fontSize="small" />
                  News
                </Typography>

                <Typography
                  component={RouterLink}
                  to="/watchlist"
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: 500,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <StarRoundedIcon fontSize="small" />
                  Watchlist
                </Typography>

                <ThemeToggle mode={mode} toggleMode={toggleMode} />
              </Box>
            )}
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Suspense
          fallback={
            <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin/:id" element={<CoinDetail />} />
            <Route path="/coins/:id" element={<CoinDetail />} />
            <Route path="/news" element={<NewsFeed />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: 500,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0.5,
};
