import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Etudiant.css";

const API = "http://localhost:8080/api";

export default function DemandeCreate() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [idClient, setIdClient] = useState("");
    const [lieu, setLieu] = useState("");
    const [district, setDistrict] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`${API}/clients`)
            .then(r => r.json())
            .then(setClients)
            .catch(() => {});
    }, []);

    const handleSubmit = async () => {
        if (!idClient) { setError("Veuillez sélectionner un client."); return; }
        if (!lieu.trim()) { setError("Le lieu est requis."); return; }

        setLoading(true);
        setError("");

        const res = await fetch(`${API}/demandes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                client: { id: parseInt(idClient) },
                lieu,
                district: district.trim() || null,
            }),
        });

        setLoading(false);
        if (res.ok) navigate("/Demande");
        else setError("Erreur lors de la création.");
    };

    return (
        <div className="etu-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">FORMULAIRE</span>
                    <h1 className="etu-title">Nouvelle demande</h1>
                </div>
                <button className="btn-ghost" onClick={() => navigate("/Demande")}>
                    ← Retour
                </button>
            </div>

            <div className="etu-form-wrapper">
                <div className="etu-form">
                    <div className="form-group">
                        <label>Client</label>
                        <select
                            value={idClient}
                            onChange={e => setIdClient(e.target.value)}
                            style={{
                                background: "var(--bg)",
                                border: "1.5px solid var(--border)",
                                borderRadius: "7px",
                                padding: "0.7rem 1rem",
                                fontFamily: "inherit",
                                fontSize: "0.92rem",
                                color: "var(--text-dark)",
                                outline: "none",
                            }}
                        >
                            <option value="">— Sélectionner un client —</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.nom}</option>
                            ))}
                        </select>

                        <label>Lieu</label>
                        <input
                            type="text"
                            value={lieu}
                            onChange={e => setLieu(e.target.value)}
                            placeholder="ex: Antananarivo"
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        />

                        <label>District <span style={{ color: "var(--text-light)", fontWeight: 400 }}>(optionnel)</span></label>
                        <input
                            type="text"
                            value={district}
                            onChange={e => setDistrict(e.target.value)}
                            placeholder="ex: Avaradrano"
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        />
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div className="form-actions">
                        <button className="btn-ghost" onClick={() => navigate("/Demande")}>Annuler</button>
                        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Enregistrement…" : "Créer la demande"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}