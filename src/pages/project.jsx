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
    IconButton
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

import BackButton from "../components/BackButton";
import Timercontrols from "../components/Timercontrols";
import ProjectModal from "../components/newProjectModal";
import TotalSessionTime from "../components/timeUsed";
import { useTimer } from '../context/timerContext'; 

import { getProject, deleteProject } from "../functions/projectFunctions";
import { getSessions, deleteSession } from "../functions/sessionFunctions";

export default function Project() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [sessions, setSessions] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const { sessionUpdated, setSessionUpdated, resetSessionUpdated } = useTimer();

    async function fetchProject() {
        const result = await getProject(id);
        setProject(result[0]);
    }

    async function fetchSessions() {
        const result = await getSessions(id);
        const reversedSessions = [...result].reverse();
        setSessions(reversedSessions);
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

    const handleDeleteSession = async (id) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this session?"
        );
        if (isConfirmed) {
            await deleteSession(id);
            await fetchSessions();
            setSessionUpdated(prev => !prev);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    if (!project) return <Typography>Project not found</Typography>;

    return (
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
                <Button variant="contained" onClick={handleOpenModal}>
                    <EditNoteOutlinedIcon />
                </Button>
            </Stack>

            <ProjectModal
                open={openModal}
                onClose={handleCloseModal}
                initialData={project}
                id={id}
                onSubmit={async () => {
                    const refreshed = await getProject(id);
                    setProject(refreshed[0]);
                }}
            />

            <TotalSessionTime projectId={project.id}></TotalSessionTime>

            {sessions && sessions.length > 0 && (
                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>
                        Sessions
                    </Typography>
                    <List>
                        {sessions.map((session) => (
                            <ListItem
                                key={session.id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(214, 202, 194, 0.08)',
                                    },
                                }}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDeleteSession(session.id)}
                                    >
                                        <DeleteOutlinedIcon></DeleteOutlinedIcon>
                                    </IconButton>
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
        </Box>
    );
}
