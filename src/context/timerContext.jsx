import { createContext, useContext, useState, useEffect, useRef } from "react";
import { setSession } from "../functions/sessionFunctions";

const TimerContext = createContext();

export function TimerProvider({ children }) {
    const [timers, setTimers] = useState({});
    const intervalRefs = useRef({});
    const [sessionUpdated, setSessionUpdated] = useState(false);
    const [activeProjectId, setActiveProjectId] = useState(null);

    const resetSessionUpdated = () => {
        setSessionUpdated(false);
    };

    const start = (projectId) => {
        const anyRunning = Object.values(timers).some(t => t.isRunning);

        if (!anyRunning && !timers[projectId]?.isRunning) {
            setTimers((prev) => ({
                ...prev,
                [projectId]: {
                    time: prev[projectId]?.time || 0,
                    isRunning: true,
                    isPaused: false,
                },
            }));
            setActiveProjectId(projectId);

            intervalRefs.current[projectId] = setInterval(() => {
                setTimers((prev) => ({
                    ...prev,
                    [projectId]: {
                        ...prev[projectId],
                        time: prev[projectId].time + 1,
                    },
                }));
            }, 1000);
        }
    };

    const pause = (projectId) => {
        if (timers[projectId]?.isRunning && !timers[projectId].isPaused) {
            clearInterval(intervalRefs.current[projectId]);
            setTimers((prev) => ({
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    isPaused: true,
                },
            }));
        }
        setActiveProjectId(null);
    };

    const resume = (projectId) => {
        if (timers[projectId]?.isRunning && timers[projectId].isPaused) {
            intervalRefs.current[projectId] = setInterval(() => {
                setTimers((prev) => ({
                    ...prev,
                    [projectId]: {
                        ...prev[projectId],
                        time: prev[projectId].time + 1,
                    },
                }));
            }, 1000);
            setActiveProjectId(projectId);

            setTimers((prev) => ({
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    isPaused: false,
                },
            }));
        }
    };

    const stop = async (projectId) => {
        setActiveProjectId(null);

        const sessionLength = timers[projectId].time;
        const comment = "Session ended";

        const session = {
            project_id: projectId,
            session_length: sessionLength,
            comment: comment,
        };

        await setSession(session);
        setSessionUpdated(true);

        if (intervalRefs.current[projectId]) {
            clearInterval(intervalRefs.current[projectId]);
            delete intervalRefs.current[projectId];
        }

        setTimers((prev) => ({
            ...prev,
            [projectId]: {
                time: 0,
                isRunning: false,
                isPaused: false,
            },
        }));
    };

    useEffect(() => {
        return () => {
            Object.values(intervalRefs.current).forEach(clearInterval);
        };
    }, []);

    return (
        <TimerContext.Provider
            value={{
                timers,
                start,
                pause,
                resume,
                stop,
                sessionUpdated,
                setSessionUpdated,
                resetSessionUpdated,
                activeProjectId,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
}

export const useTimer = () => useContext(TimerContext);
