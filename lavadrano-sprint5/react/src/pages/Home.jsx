import { useState, useEffect } from "react";

export default function Home() {
    const [error, setError] = useState(null);

    return (
        <div style={{ textAlign: "center" }} className="form">

            <h1>Plateforme de commande de forage</h1>
            <h1 style={{color: "#2f4050"}}>ETU003533</h1>
        </div>
    );
}