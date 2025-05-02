import { Button, Paper, Stack, Typography } from "@mui/material";
import { useTimer } from "../context/timerContext";

export default function TimerControls({ projectId }) {
    const { timers, start, pause, resume, stop } = useTimer();
    const timer = timers[projectId] || { time: 0, isRunning: false, isPaused: false };

    const formatTime = (t) => {
        const mins = Math.floor(t / 60).toString().padStart(2, "0");
        const secs = (t % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    };

    return (
        <Paper>
            <Stack spacing={2} padding={4} alignItems="center">
                <Typography variant="h4">{formatTime(timer.time)}</Typography>
                <Stack direction="row" spacing={2}>
                    {!timer.isRunning && (
                        <Button variant="contained" onClick={() => start(projectId)}>
                            Start
                        </Button>
                    )}
                    {timer.isRunning && !timer.isPaused && (
                        <Button onClick={() => pause(projectId)}>Pause</Button>
                    )}
                    {timer.isRunning && timer.isPaused && (
                        <Button onClick={() => resume(projectId)}>Resume</Button>
                    )}
                    {timer.isRunning && (
                        <Button color="error" onClick={() => stop(projectId)}>
                            Stop
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Paper>
    );
}
