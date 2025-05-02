import Database from "@tauri-apps/plugin-sql";

export async function setProject(project) {
    try {
        const db = await Database.load("sqlite:test.db");

        await db.execute(
            "INSERT INTO projects (title, description, category) VALUES ($1, $2, $3)",
            [project.title, project.description, project.category]
        );
    } catch (error) {
        console.log(error);
        setError("Failed to insert project - check console");
    }
}

export async function updateProject(id, { title, description, category }) {
    try {
        const db = await Database.load("sqlite:test.db");

        await db.execute(
            "UPDATE projects SET title = ?, description = ?, category = ? WHERE id = ?",
            [title, description, category, id]
        );

        return true;
    } catch (error) {
        console.error("Failed to update project:", error);
        return false;
    }
}

export async function getProjects() {
    try {
        const db = await Database.load("sqlite:test.db");
        const Projects = await db.select("SELECT * FROM projects");

        return Projects;
    } catch (error) {
        console.log(error);
        setError("Failed to get projects - check console");
    }
}

export async function getProject(id) {
    try {
        const db = await Database.load("sqlite:test.db");
        const Projects = await db.select(
            "SELECT * FROM projects WHERE id = $1",
            [id]
        );

        return Projects;
    } catch (error) {
        console.log(error);
        setError("Failed to get projects - check console");
    }
}

export async function deleteProject(id) {
    try {
        const db = await Database.load("sqlite:test.db");
        await db.execute("DELETE FROM projects WHERE id = ?", [id]);
        console.log("project deleted");
        return true;
    } catch (error) {
        console.error("Failed to delete project:", error);
        return false;
    }
}
