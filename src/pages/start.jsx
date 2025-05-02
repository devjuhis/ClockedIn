import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Start() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/home");
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f0f0f0"
        >
            <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                    width: "200px",
                    marginBottom: "20px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "10px",
                    animation: "float 2s ease-in-out infinite",
                    '@keyframes float': {
                        '0%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-20px)' },
                        '100%': { transform: 'translateY(0)' },
                    },
                }}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleStart}
            >
                Start
            </Button>
        </Box>
    );
}
