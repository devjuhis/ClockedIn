import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Button,
    Stack,
    CircularProgress
} from "@mui/material";

import SportsVolleyballOutlinedIcon from "@mui/icons-material/SportsVolleyballOutlined";
import CodeIcon from "@mui/icons-material/Code";
import AddIcon from "@mui/icons-material/Add";
import DesignServicesIcon from "@mui/icons-material/DesignServicesOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import BarChartIcon from '@mui/icons-material/BarChart';

import { useNavigate } from "react-router-dom";
import { useTimer } from "../context/timerContext";
import NewProjectModal from "../components/newProjectModal";
import { getProjects } from "../functions/projectFunctions";
import { useState, useLayoutEffect } from "react";

const getCategoryIcon = (category) => {
    switch (category) {
        case "code":
            return <CodeIcon sx={{ fontSize: 80 }} />;
        case "sports":
            return <SportsVolleyballOutlinedIcon sx={{ fontSize: 80 }} />;
        case "design":
            return <DesignServicesIcon sx={{ fontSize: 80 }} />;
        case "school":
            return <AutoStoriesOutlinedIcon sx={{ fontSize: 80 }} />;
        default:
            return null;
    }
};

export default function Home() {
    const navigate = useNavigate();
    const { start, stop, activeProjectId } = useTimer();
    const [projects, setProjects] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        async function loadProjects() {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            const result = await getProjects();
            if (result) {
                setProjects(result);
            }
            setLoading(false);
        }
        loadProjects();
    }, []);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }
    

    const toggleStartProject = (id) => {
        if (activeProjectId == id) {
            stop(id);
        } else {
            start(id);
        }
    };

    const handleOpenProject = (id) => {
        navigate(`/project/${id}`);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleOpenStatistics = () => {
        navigate("/statistics");
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Box py={4} px={4}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            width: "225px",
                            height: "100%",
                        }}
                    >
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                height: "100%",
                                cursor: "pointer",
                                alignItems: "center",
                                textAlign: "center",
                                p: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                                onClick={() => handleOpenModal()}
                            >
                                <AddIcon
                                    sx={{
                                        fontSize: 50,
                                        color: "primary.main",
                                    }}
                                />
                                <Typography variant="h6" color="textSecondary" fontSize={15}>
                                    Add New Project
                                </Typography>
                            </Box>
                        </Card>

                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                height: "100%",
                                cursor: "pointer",
                                alignItems: "center",
                                textAlign: "center",
                                p: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                                onClick={() => handleOpenStatistics()}
                            >
                                <BarChartIcon
                                    sx={{
                                        fontSize: 50,
                                        color: "primary.main",
                                    }}
                                />
                                <Typography variant="h6" color="textSecondary" fontSize={15}>
                                    Open statistics
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                </Grid>

                {projects.map((project) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                width: "225px",
                                position: "relative",
                            }}
                        >
                            {activeProjectId == project.id && (
                                <Typography
                                    variant="caption"
                                    color="primary"
                                    sx={{
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        backgroundColor: "primary.main",
                                        color: "white",
                                        padding: "2px 5px",
                                        borderRadius: "5px",
                                    }}
                                >
                                    Timer Running
                                </Typography>
                            )}

                            <CardContent>
                                <Typography variant="h6">
                                    {project.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    color="text.secondary"
                                >
                                    {project.category}
                                </Typography>

                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    my={2}
                                >
                                    {getCategoryIcon(project.category)}
                                </Box>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                    sx={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        WebkitLineClamp: 2,
                                        textOverflow: "ellipsis",
                                        height: "40px",
                                    }}
                                >
                                    {project.description}
                                </Typography>

                                <Stack direction="row" spacing={2} mt={2}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() =>
                                            toggleStartProject(project.id)
                                        }
                                    >
                                        {activeProjectId == project.id
                                            ? "Stop"
                                            : "Start"}
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        onClick={() =>
                                            handleOpenProject(project.id)
                                        }
                                    >
                                        View
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <NewProjectModal
                open={openModal}
                onClose={handleCloseModal}
                onSubmit={async () => {
                    const refreshed = await getProjects();
                    setProjects(refreshed);
                }}
            />
        </Box>
    );
}
