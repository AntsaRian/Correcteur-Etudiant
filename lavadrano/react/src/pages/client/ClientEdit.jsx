import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/Etudiant.css";

const API = "http://localhost:8080/api";

export default function ClientEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nom, setNom] = useState("");
    const [contact, setContact] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetch(`${API}/clients/${id}`)
            .then(r => r.json())
            .then(data => { setNom(data.nom || ""); setContact(data.contact || ""); setFetching(false); })
            .catch(() => setFetching(false));
    }, [id]);

    const handleSubmit = async () => {
        if (!nom.trim()) {
            setError("Le nom est requis.");
            return;
        }

        if (!contact) {
            setError("Le contact est requis.");
            return;
        }

        setLoading(true);
        setError("");

        const res = await fetch(`${API}/clients/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom, contact }),
        });

        setLoading(false);
        if (res.ok) {
            navigate("/Client");
        } else {
            setError("Erreur lors de la mise à jour.");
        }
    };

    if (fetching) return <div className="etu-page"><div className="etu-loading">Chargement…</div></div>;

    return (
        <div className="etu-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">MODIFICATION · #{id}</span>
                    <h1 className="etu-title">Éditer le client</h1>
                </div>
                <button className="btn-ghost" onClick={() => navigate("/Client")}>
                    ← Retour
                </button>
            </div>

            <div className="etu-form-wrapper">
                <div className="etu-form">
                    <div className="form-group">
                        <label>Nom complet</label>
                        <input
                            type="text"
                            value={nom}
                            onChange={e => setNom(e.target.value)}
                            placeholder="ex: Rakoto Jean"
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        />

                        <label>Contact</label>
                        <input
                            type="text"
                            value={contact}
                            onChange={e => setContact(e.target.value)}
                            placeholder="032 57 ..."
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        />
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div className="form-actions">
                        <button className="btn-ghost" onClick={() => navigate("/Client")}>Annuler</button>
                        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Mise à jour…" : "Enregistrer les modifications"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}