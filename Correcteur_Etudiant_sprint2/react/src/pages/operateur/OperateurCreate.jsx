import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Operateur.css";

const API = "http://localhost:8080/api";

const SUGGESTIONS = [">", "<", ">=", "<=", "=="];

export default function OperateurCreate() {
    const navigate = useNavigate();
    const [operateur, setOperateur] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!operateur.trim()) {
            setError("Le symbole est requis.");
            return;
        }
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/operateurs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ operateur }),
        });

        setLoading(false);
        if (res.ok) {
            navigate("/Opera");
        } else {
            setError("Erreur lors de la création.");
        }
    };

    return (
        <div className="opera-page">
            <div className="opera-header">
                <div className="opera-header-left">
                    <span className="opera-label">FORMULAIRE</span>
                    <h1 className="opera-title">Nouvel opérateur</h1>
                </div>
                <button className="btn-ghost" onClick={() => navigate("/Opera")}>
                    ← Retour
                </button>
            </div>

            <div className="opera-form-wrapper">
                <div className="opera-form">
                    <div className="form-group">
                        <label>Symbole de l'opérateur</label>
                        <input
                            type="text"
                            value={operateur}
                            onChange={e => setOperateur(e.target.value)}
                            placeholder="ex: >"
                            maxLength={5}
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        />
                    </div>

                    <div className="suggestions">
                        <span className="suggestions-label">Suggestions :</span>
                        {SUGGESTIONS.map(s => (
                            <button
                                key={s}
                                className={`suggestion-chip ${operateur === s ? "active" : ""}`}
                                onClick={() => setOperateur(s)}
                                type="button"
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div className="form-actions">
                        <button className="btn-ghost" onClick={() => navigate("/Opera")}>Annuler</button>
                        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Enregistrement…" : "Créer l'opérateur"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}