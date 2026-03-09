import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/Operateur.css";

const API = "http://localhost:8080/api";

const SUGGESTIONS = [">", "<", ">=", "<=", "=="];

export default function OperateurEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [operateur, setOperateur] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetch(`${API}/operateurs/${id}`)
            .then(r => r.json())
            .then(data => { setOperateur(data.operateur || ""); setFetching(false); })
            .catch(() => setFetching(false));
    }, [id]);

    const handleSubmit = async () => {
        if (!operateur.trim()) {
            setError("Le symbole est requis.");
            return;
        }
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/operateurs/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ operateur }),
        });

        setLoading(false);
        if (res.ok) {
            navigate("/Opera");
        } else {
            setError("Erreur lors de la mise à jour.");
        }
    };

    if (fetching) return <div className="opera-page"><div className="opera-loading">Chargement…</div></div>;

    return (
        <div className="opera-page">
            <div className="opera-header">
                <div className="opera-header-left">
                    <span className="opera-label">MODIFICATION · #{id}</span>
                    <h1 className="opera-title">Éditer l'opérateur</h1>
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
                            {loading ? "Mise à jour…" : "Enregistrer les modifications"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}