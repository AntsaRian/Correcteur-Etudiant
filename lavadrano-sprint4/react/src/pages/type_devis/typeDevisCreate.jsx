import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Etudiant.css";

const API = "http://localhost:8080/api";

export default function TypeDevisCreate() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ libelle: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.libelle) {
            setError("Tous les champs sont requis.");
            return;
        }
        setLoading(true);
        setError("");

        const body = {
            libelle: form.libelle
        };

        const res = await fetch(`${API}/type-devis`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        setLoading(false);
        if (res.ok) {
            navigate("/TypeDevis");
        } else {
            setError("Erreur lors de la création.");
        }
    };

    return (
        <div className="param-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">FORMULAIRE</span>
                    <h1 className="etu-title">Nouveau type de devis</h1>
                </div>
                <button className="btn-ghost" onClick={() => navigate("/TypeDevis")}>
                    ← Retour
                </button>
            </div>

            <div className="etu-form-wrapper">
                <div className="etu-form">
                    <div className="form-group">
                        <label>Type devis</label>
                        <input
                            type="text"
                            name="libelle"
                            value={form.libelle}
                            onChange={handleChange}
                            placeholder="Analyse"
                        />
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div className="form-actions">
                        <button className="btn-ghost" onClick={() => navigate("/TypeDevis")}>Annuler</button>
                        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Enregistrement…" : "Créer le type devis"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}