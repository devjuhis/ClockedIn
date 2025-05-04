import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Typography,
    Box,
    Button,
    Stack,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddIcon from '@mui/icons-material/Add';

import BackButton from "../components/BackButton";
import Timercontrols from "../components/Timercontrols";
import ProjectModal from "../components/newProjectModal";
import SessionModal from "../components/sessionModal";
import TotalSessionTime from "../components/timeUsed";
import { useTimer } from "../context/timerContext";
import AnimatedPage from "../components/animatedPage";

import { getProject, deleteProject } from "../functions/projectFunctions";
import { getSessions, deleteSession } from "../functions/sessionFunctions";

export default function Project() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [openProjectModal, setOpenProjectModal] = useState(false);
    const [openSessionModal, setOpenSessionModal] = useState(false);
    const [editingSession, setEditingSession] = useState(null);

    const { sessionUpdated, setSessionUpdated, resetSessionUpdated } =
        useTimer();

    async function fetchProject() {
        const result = await getProject(id);
        setProject(result[0]);
    }

    async function fetchSessions() {
        const result = await getSessions(id);
        setSessions([...result].reverse());
    }

    useEffect(() => {
        if (id) {
            fetchProject();
            fetchSessions();
        }
    }, [id]);

    useEffect(() => {
        if (sessionUpdated) {
            fetchSessions();
            resetSessionUpdated();
        }
    }, [sessionUpdated, resetSessionUpdated]);

    const handleDeleteProject = async () => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );
        if (isConfirmed) {
            await deleteProject(id);
            window.location.href = "/";
        }
    };

    const handleDeleteSession = async (sessionId) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this session?"
        );
        if (isConfirmed) {
            await deleteSession(sessionId);
            await fetchSessions();
            setSessionUpdated((prev) => !prev);
        }
    };

    const handleEditSession = (session) => {
        setEditingSession(session);
        setOpenSessionModal(true);
    };

    const handleOpenSessionModal = () => {
        setOpenSessionModal(true);
    }

    const handleCloseSessionModal = () => {
        setOpenSessionModal(false);
        setEditingSession(null);
    };

    const handleOpenProjectModal = () => {
        setOpenProjectModal(true);
    };

    const handleCloseProjectModal = () => {
        setOpenProjectModal(false);
    };

    if (!project) return <Typography>Project not found</Typography>;

    return (
        <AnimatedPage>
            <Box p={4}>
                <BackButton />
                <Typography variant="h4" gutterBottom>
                    {project.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                    {project.description}
                </Typography>

                <Timercontrols projectId={id} />

                <Stack direction="row" spacing={2} mt={2}>
                    <Button variant="contained" onClick={handleDeleteProject}>
                        <DeleteOutlinedIcon />
                    </Button>
                    <Button variant="contained" onClick={handleOpenProjectModal}>
                        <EditNoteOutlinedIcon />
                    </Button>
                </Stack>

                <ProjectModal
                    open={openProjectModal}
                    onClose={handleCloseProjectModal}
                    initialData={project}
                    id={id}
                    onSubmit={async () => {
                        const refreshed = await getProject(id);
                        setProject(refreshed[0]);
                    }}
                />

                <TotalSessionTime projectId={project.id} />

                {sessions && sessions.length > 0 && (
                    <Box mt={4}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h5" gutterBottom>
                                Sessions
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={handleOpenSessionModal}
                            >
                                <AddIcon />
                            </Button>
                        </Stack>
                        <List>
                            {sessions.map((session) => (
                                <ListItem
                                    key={session.id}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "rgba(214, 202, 194, 0.08)",
                                        },
                                    }}
                                    secondaryAction={
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <IconButton
                                                edge="end"
                                                aria-label="edit"
                                                onClick={() => handleEditSession(session)}
                                            >
                                                <EditNoteIcon />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => handleDeleteSession(session.id)}
                                            >
                                                <DeleteOutlinedIcon />
                                            </IconButton>
                                        </Box>
                                    }
                                >
                                    <ListItemText
                                        primary={`Session Length: ${session.session_length} s`}
                                        secondary={
                                            <>
                                                {session.date
                                                    ? `Date: ${session.date}`
                                                    : "No date"}
                                                <br />
                                                {session.comment
                                                    ? `Comment: ${session.comment}`
                                                    : "No comment"}
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}

                {openSessionModal && (
                    <SessionModal
                        open={openSessionModal}
                        onClose={handleCloseSessionModal}
                        initialData={editingSession}
                        projectID={id}
                        onSubmit={async () => {
                            await fetchSessions();
                            setSessionUpdated(true);
                            handleCloseSessionModal();
                        }}
                    />
                )}
            </Box>
        </AnimatedPage>
    );
}
