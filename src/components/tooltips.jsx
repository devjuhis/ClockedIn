export const SessionDurationTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const duration = payload[0].value;
    const date = label;

    return (
        <div style={{ background: "#333", border: "1px solid #ccc", borderRadius: "10px", padding: "12px" }}>
            <div>{date}</div>
            <div>{duration.toFixed(2)} h</div>
        </div>
    );
};

export const ProjectPriceTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const price = payload[0].value;
    const name = label;

    return (
        <div style={{ background: "#333", border: "1px solid #ccc", borderRadius: "10px", padding: "12px" }}>
            <div>{name}</div>
            <div>{price.toFixed(2)} €</div>
        </div>
    );
};

export const ProjectsTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const time = payload[0].value;
    const name = payload[0].name;

    return (
        <div style={{ background: "#333", border: "1px solid #ccc", borderRadius: "10px", padding: "12px" }}>
            <div>{name}</div>
            <div>{time.toFixed(2)} h</div>
        </div>
    );
};

export default {
    SessionDurationTooltip,
    ProjectPriceTooltip,
    ProjectsTooltip
};