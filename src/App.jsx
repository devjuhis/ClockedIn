import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Start from "./pages/start";
import Home from "./pages/home";
import Project from "./pages/project";
import Statistics from "./pages/statistics";

import { TimerProvider } from "./context/timerContext";
import { AnimatePresence } from "framer-motion";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#FF6B6B" },
        secondary: { main: "#f48fb1" },
        background: {
            default: "#121212",
            paper: "#1d1d1d",
        },
        text: {
            primary: "#ffffff",
            secondary: "#aaaaaa",
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#1d1d1d",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                        backgroundColor: "#2a2a2a",
                        cursor: "pointer",
                    },
                },
            },
        },
    },
});

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<Project />} />
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TimerProvider>
                <Router>
                    <AnimatedRoutes />
                </Router>
            </TimerProvider>
        </ThemeProvider>
    );
}

export default App;
