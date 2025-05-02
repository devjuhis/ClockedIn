import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, useTheme } from "@mui/material";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Line,
    ResponsiveContainer,
} from "recharts";
import BackButton from "../components/BackButton";

import { getAllSessions } from "../functions/sessionFunctions";

const COLORS = [
    "#FF6B6B",  // Pääväri: lämmin punainen
    "#D85D5D",  // Tumma punainen sävy
    "#9B2D2D",  // Syvempi punainen
    "#6B1A1A",  // Tummanpunainen
    "#F07B7B",  // Vaaleampi punainen
];


export default function Statistics() {
    const [sessions, setSessions] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        async function fetchData() {
            try {
                const sessionData = await getAllSessions();
                setSessions(sessionData);
            } catch (error) {
                console.error("Failed to fetch sessions:", error);
            }
        }

        fetchData();
    }, []);

    const projects = [];

    sessions.forEach(session => {
        const project = projects.find(project => project.id === session.project_id);
        if (project) {
            project.time += session.session_length;
            project.sessions.push(session);
        } else {
            projects.push({
                id: session.project_id,
                name: session.title,
                time: session.session_length,
                date: session.date,
                sessions: [session],
            });
        }
    });

    const timePerProject = projects.map(project => ({
        name: project.name,
        time: parseFloat(
            (project.sessions.reduce((total, session) => total + session.session_length, 0) / 3600).toFixed(3)
        )  
    }));

    const sessionsByDate = projects.map(project => ({
        date: project.date,
        duration: parseFloat(
            (project.sessions.reduce((total, session) => total + session.session_length, 0) / 3600).toFixed(3)
        )        
    }));

    

    

    return (
        <Box py={4} px={4} sx={{ maxWidth: "600px", margin: "0 auto" }}>
            <BackButton />

            <Typography variant="h4" mb={4}>
                Project Statistics
            </Typography>

            <Grid container columns={12} spacing={3}>
                <Paper sx={{ p: 3, height: "100%", width: "100%" }}>
                    <Typography variant="h6" gutterBottom>
                        Time Spent per Project (hours)
                    </Typography>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={timePerProject}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="time"
                                fill={theme.palette.primary.main}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>

                <Paper sx={{ p: 3, height: "100%", width: "100%" }}>
                    <Typography variant="h6" gutterBottom>
                        Time Distribution (%)
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={timePerProject}
                                dataKey="time"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {timePerProject.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>

                <Paper sx={{ p: 3, height: "100%", width: "100%" }}>
                    <Typography variant="h6" gutterBottom>
                        Session Length Over Time (hours)
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={sessionsByDate}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="duration"
                                stroke={theme.palette.primary.main}
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>
        </Box>
    );
}
