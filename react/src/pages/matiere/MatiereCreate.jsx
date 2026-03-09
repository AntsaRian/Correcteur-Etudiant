import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Matiere.css";

const API = "http://localhost:8080/api";

export default function MatiereCreate() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ nom: "", coeff: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.nom.trim()) {
            setError("Le nom est requis.");
            return;
        }
        setLoading(true);
        setError("");

        const body = {
            nom: form.nom,
            coeff: form.coeff !== "" ? parseInt(form.coeff) : null,
        };

        const res = await fetch(`${API}/matieres`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        setLoading(false);
        if (res.ok) {
            navigate("/Matiere");
        } else {
            setError("Erreur lors de la création.");
        }
    };

    return (
        <div className="mat-page">
            <div className="mat-header">
                <div className="mat-header-left">
                    <span className="mat-label">FORMULAIRE</span>
                    <h1 className="mat-title">Nouvelle matière</h1>
                </div>
                <button className="btn-ghost" onClick={() => navigate("/Matiere")}>
                    ← Retour
                </button>
            </div>

            <div className="mat-form-wrapper">
                <div className="mat-form">
                    <div className="form-group">
                        <label>Nom de la matière</label>
                        <input
                            type="text"
                            name="nom"
                            value={form.nom}
                            onChange={handleChange}
                            placeholder="ex: Mathématiques"
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        />
                    </div>

                    <div className="form-group">
                        <label>Coefficient <span className="label-hint">(optionnel)</span></label>
                        <input
                            type="number"
                            name="coeff"
                            min="1"
                            value={form.coeff}
                            onChange={handleChange}
                            placeholder="ex: 3"
                        />
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div className="form-actions">
                        <button className="btn-ghost" onClick={() => navigate("/Matiere")}>Annuler</button>
                        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Enregistrement…" : "Créer la matière"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}