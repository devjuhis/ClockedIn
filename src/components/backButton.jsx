import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton({ label = "Back" }) {
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => navigate(-1)}
            variant="text"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
        >
            {label}
        </Button>
    );
}
