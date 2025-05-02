import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Project from "./pages/project";
import Statistics from "./pages/statistics";

import { TimerProvider } from "./context/timerContext";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#FF6B6B",
        },
        secondary: {
            main: "#f48fb1",
        },
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

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TimerProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/project/:id" element={<Project />} />
                        <Route path="/statistics" element={<Statistics />} />
                    </Routes>
                </Router>
            </TimerProvider>
        </ThemeProvider>
    );
}

export default App;
