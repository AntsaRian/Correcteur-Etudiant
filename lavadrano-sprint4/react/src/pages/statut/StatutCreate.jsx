import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Etudiant.css";

const API = "http://localhost:8080/api";

export default function StatutCreate() {
    const navigate = useNavigate();
    const [libelle, setLibelle] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!libelle.trim()) {
            setError("Le libelle est requis.");
            return;
        }

        setLoading(true);
        setError("");

        const res = await fetch(`${API}/statuts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ libelle }),
        });

        setLoading(false);
        if (res.ok) {
            navigate("/Statut");
        } else {
            setError("Erreur lors de la création.");
        }
    };

    return (
        <div className="etu-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">FORMULAIRE</span>
                    <h1 className="etu-title">Nouveau statut</h1>
                </div>
                <button className="btn-ghost" onClick={() => navigate("/Statut")}>
                    ← Retour
                </button>
            </div>

            <div className="etu-form-wrapper">
                <div className="etu-form">
                    <div className="form-group">
                        <label>Libelle</label>
                        <input
                            type="text"
                            value={libelle}
                            onChange={e => setLibelle(e.target.value)}
                            placeholder="ex: Cree"
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        />
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div className="form-actions">
                        <button className="btn-ghost" onClick={() => navigate("/Statut")}>Annuler</button>
                        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Enregistrement…" : "Créer le statut"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}