import Database from "@tauri-apps/plugin-sql";

export async function setProject(project) {
    try {
        const db = await Database.load("sqlite:test_v3.db");

        await db.execute(
            "INSERT INTO projects (title, description, category, price) VALUES ($1, $2, $3, $4)",
            [project.title, project.description, project.category, project.price]
        );
    } catch (error) {
        console.log(error);
        setError("Failed to insert project - check console");
    }
}

export async function updateProject(id, { title, description, category, price }) {
    try {
        const db = await Database.load("sqlite:test_v3.db");

        await db.execute(
            "UPDATE projects SET title = ?, description = ?, category = ?, price = ? WHERE id = ?",
            [title, description, category, price, id]
        );

        return true;
    } catch (error) {
        console.error("Failed to update project:", error);
        return false;
    }
}

export async function getProjects() {
    try {
        const db = await Database.load("sqlite:test_v3.db");
        const Projects = await db.select("SELECT * FROM projects");
        return Projects;
    } catch (error) {
        console.error("Failed to get projects:", error);
        return [];
    }
}

export async function getProject(id) {
    try {
        const db = await Database.load("sqlite:test_v3.db");
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
        const db = await Database.load("sqlite:test_v3.db");
        await db.execute("DELETE FROM projects WHERE id = ?", [id]);
        console.log("project deleted");
        return true;
    } catch (error) {
        console.error("Failed to delete project:", error);
        return false;
    }
}
