import Database from "@tauri-apps/plugin-sql";

export async function setSession(session) {
    try {
        const db = await Database.load("sqlite:test_v3.db");

        await db.execute(
            "INSERT INTO sessions (project_id, session_length, comment) VALUES ($1, $2, $3)",
            [session.project_id, session.session_length, session.comment]
        );
        

    } catch (error) {
        console.log(error);
        setError("Failed to insert session - check console");
    }
}

export async function updateSession(sessionData) {
    try {
        const db = await Database.load("sqlite:test_v3.db");

        await db.execute(
            "UPDATE sessions SET project_id = ?, session_length = ?, comment = ? WHERE id = ?",
            [sessionData.project_id, sessionData.session_length, sessionData.comment, sessionData.id]
        );

        return true;
    } catch (error) {
        console.error("Failed to update session:", error);
        return false;
    }
}

export async function getSessions(project_id) {
    try {
        const db = await Database.load("sqlite:test_v3.db");
        const sessions = await db.select("SELECT * FROM sessions WHERE project_id = $1", [project_id]);

        return sessions;
    } catch (error) {
        console.log(error);
        setError("Failed to get sessions - check console");
    }
}

export async function getAllSessions() {
    try {
        const db = await Database.load("sqlite:test_v3.db");
        const sessions = await db.select("SELECT * FROM sessions s join projects p on s.project_id = p.id");

        return sessions;
    } catch (error) {
        console.log(error);
        setError("Failed to get sessions - check console");
    }
}

export async function deleteSession(id) {
    try {
        const db = await Database.load("sqlite:test_v3.db");
        await db.execute("DELETE FROM sessions WHERE id = $1", [id]);

        return true;
    } catch (error) {
        console.log(error);
        setError("Failed to get sessions - check console");
    }
}


