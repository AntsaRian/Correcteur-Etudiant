import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Resolution.css";

const API = "http://localhost:8080/api";

export default function ResolutionCreate() {
    const navigate = useNavigate();
    const [resolution, setResolution] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!resolution.trim()) {
            setError("La résolution est requise.");
            return;
        }
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/resolutions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resolution }),
        });

        setLoading(false);
        if (res.ok) {
            navigate("/Reso");
        } else {
            setError("Erreur lors de la création.");
        }
    };

    return (
        <div className="reso-page">
            <div className="reso-header">
                <div className="reso-header-left">
                    <span className="reso-label">FORMULAIRE</span>
                    <h1 className="reso-title">Nouvelle résolution</h1>
                </div>
                <button className="btn-ghost" onClick={() => navigate("/Reso")}>
                    ← Retour
                </button>
            </div>

            <div className="reso-form-wrapper">
                <div className="reso-form">
                    <div className="form-group">
                        <label>Libellé de la résolution</label>
                        <input
                            type="text"
                            value={resolution}
                            onChange={e => setResolution(e.target.value)}
                            placeholder="ex: plus grand"
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        />
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div className="form-actions">
                        <button className="btn-ghost" onClick={() => navigate("/Reso")}>Annuler</button>
                        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Enregistrement…" : "Créer la résolution"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}