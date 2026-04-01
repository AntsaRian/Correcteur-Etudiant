import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/Etudiant.css";

const API = "http://localhost:8080/api";

export default function TypeDevisEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [libelle, setLibelle] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
            fetch(`${API}/type-devis/${id}`)
            .then(r => r.json())
            .then(data => { setLibelle(data.libelle || ""); setFetching(false); })
            .catch(() => setFetching(false));
    }, [id]);

    const handleSubmit = async () => {
        if (!libelle) { setError("Veuillez entrer le libelle"); return; }

        setLoading(true);
        setError("");

        const res = await fetch(`${API}/type-devis/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                libelle
            }),
        });

        setLoading(false);
        if (res.ok) navigate("/TypeDevis");
        else setError("Erreur lors de la mise à jour.");
    };

    if (fetching) return <div className="etu-page"><div className="etu-loading">Chargement…</div></div>;

    return (
        <div className="etu-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">MODIFICATION · #{id}</span>
                    <h1 className="etu-title">Éditer type devis</h1>
                </div>
                <button className="btn-ghost" onClick={() => navigate("/TypeDevis")}>
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
                            placeholder="Analyse"
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        />
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div className="form-actions">
                        <button className="btn-ghost" onClick={() => navigate("/TypeDevis")}>Annuler</button>
                        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Mise à jour…" : "Enregistrer les modifications"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}