import { useState, useEffect } from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography
} from "@mui/material";

import { setSession, updateSession } from "../functions/sessionFunctions";

export default function NewSessionModal({ open, onClose, onSubmit, initialData, projectID }) {
    const [id, setId] = useState(null);
    const [project_id, setProject_id] = useState("");
    const [session_length, setSession_length] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (initialData) {
            setId(initialData.id);
            setProject_id(initialData.project_id);
            setSession_length(initialData.session_length);
            setComment(initialData.comment);
        } else {
            setProject_id(projectID);
        }
    }, [initialData]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!project_id || !session_length || !comment.trim()) {
            alert("Please fill all fields.");
            return;
        }

        const sessionData = { id, project_id, session_length, comment };

        if (initialData) {
            // If ID exists, update the session
            await updateSession(sessionData);
        } else {
            // If no ID, create a new session
            await setSession(sessionData);
        }

        resetForm();
        onSubmit();
        onClose(); 
    }

    const resetForm = () => {
        setProject_id("");
        setSession_length("");
        setComment("");
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                tabIndex={0}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#333",
                    padding: 4,
                    boxShadow: 24,
                    borderRadius: 2,
                    width: 400,
                    outline: "none",
                    border: "none",
                }}
            >
                <Typography variant="h6" mb={2}>
                    {id ? "Update Session" : "Add New Session"}
                </Typography>

                <TextField
                    fullWidth
                    label="Project ID"
                    value={project_id}
                    onChange={(e) => setProject_id(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    disabled
                />

                <TextField
                    fullWidth
                    label="Session Length (seconds)"
                    value={session_length}
                    type="number"
                    onChange={(e) => setSession_length(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />

                <TextField
                    fullWidth
                    label="Comment"
                    multiline
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />

                <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
