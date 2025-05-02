import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { getSessions } from "../functions/sessionFunctions";

import { useTimer } from '../context/timerContext'; 

export default function TotalSessionTime({ projectId }) {
    
    const [totalTime, setTotalTime] = useState(0);
    const { sessionUpdated } = useTimer();

    useEffect(() => {
        async function fetchSessions() {
            const sessions = await getSessions(projectId);
            
            if (sessions && sessions.length > 0) {
                const total = sessions.reduce((sum, session) => sum + session.session_length, 0);
                setTotalTime(total);
            }
        }
    
        fetchSessions();
    }, [projectId, sessionUpdated]);

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours}h: ${minutes.toString().padStart(2, "0")}min: ${seconds.toString().padStart(2, "0")}s`;
    };
    
    return (
        <Box sx={{ my: 5 }}>
            <Paper sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">Total time</Typography>
                <Typography variant="body1">{formatTime(totalTime)}</Typography>
            </Paper>
        </Box>
    );
}
