import { useState, useEffect } from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";

import { setProject, updateProject } from "../functions/projectFunctions";

export default function AddProjectModal({ open, onClose, onSubmit, id, initialData }) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (id && initialData) {
            setTitle(initialData.title);
            setCategory(initialData.category);
            setDescription(initialData.description);
        }
    }, [id, initialData]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !category || !description.trim()) {
            alert("Please fill all fields.");
            return;
        }

        const projectData = { title, description, category };

        if (id) {
            // If ID exists, update the project
            await updateProject(id, projectData);
        } else {
            // If no ID, create a new project
            await setProject(projectData);
        }

        resetForm();
        onSubmit();
        onClose(); 
    }

    const resetForm = () => {
        setTitle("");
        setCategory("");
        setDescription("");
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
                    {id ? "Update Project" : "Add New Project"}
                </Typography>

                <TextField
                    fullWidth
                    label="Project Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                    >
                        <MenuItem value="code">Code</MenuItem>
                        <MenuItem value="sports">Sports</MenuItem>
                        <MenuItem value="design">Design</MenuItem>
                        <MenuItem value="school">School</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
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
