import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Parametre.css";

const API = "http://localhost:8080/api";

export default function ParametreCreate() {
    const navigate = useNavigate();
    const [matieres, setMatieres] = useState([]);
    const [operateurs, setOperateurs] = useState([]);
    const [resolutions, setResolutions] = useState([]);
    const [form, setForm] = useState({ id_matiere: "", diff: "", id_operateur: "", id_resolution: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Promise.all([
            fetch(`${API}/matieres`).then(r => r.json()),
            fetch(`${API}/operateurs`).then(r => r.json()),
            fetch(`${API}/resolutions`).then(r => r.json()),
        ]).then(([m, o, r]) => {
            setMatieres(m);
            setOperateurs(o);
            setResolutions(r);
        });
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.id_matiere || !form.diff || !form.id_operateur || !form.id_resolution) {
            setError("Tous les champs sont requis.");
            return;
        }
        setLoading(true);
        setError("");

        const body = {
            matiere: { id: parseInt(form.id_matiere) },
            diff: parseFloat(form.diff),
            operateur: { id: parseInt(form.id_operateur) },
            resolution: { id: parseInt(form.id_resolution) },
        };

        const res = await fetch(`${API}/parametres`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        setLoading(false);
        if (res.ok) {
            navigate("/Param");
        } else {
            setError("Erreur lors de la création.");
        }
    };

    return (
        <div className="param-page">
            <div className="param-header">
                <div className="param-header-left">
                    <span className="param-label">FORMULAIRE</span>
                    <h1 className="param-title">Nouveau paramètre</h1>
                </div>
                <button className="btn-ghost" onClick={() => navigate("/Param")}>
                    ← Retour
                </button>
            </div>

            <div className="param-form-wrapper">
                <div className="param-form">
                    <div className="form-group">
                        <label>Matière</label>
                        <select name="id_matiere" value={form.id_matiere} onChange={handleChange}>
                            <option value="">— Sélectionner —</option>
                            {matieres.map(m => (
                                <option key={m.id} value={m.id}>{m.nom}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Différentiel (diff)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="diff"
                            value={form.diff}
                            onChange={handleChange}
                            placeholder="ex: 2.50"
                        />
                    </div>

                    <div className="form-group">
                        <label>Opérateur</label>
                        <select name="id_operateur" value={form.id_operateur} onChange={handleChange}>
                            <option value="">— Sélectionner —</option>
                            {operateurs.map(o => (
                                <option style={{color: "#2f4050"}} key={o.id} value={o.id}>{o.symbole || o.nom}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Résolution</label>
                        <select name="id_resolution" value={form.id_resolution} onChange={handleChange}>
                            <option value="">— Sélectionner —</option>
                            {resolutions.map(r => (
                                <option key={r.id} value={r.id}>{r.nom}</option>
                            ))}
                        </select>
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div className="form-actions">
                        <button className="btn-ghost" onClick={() => navigate("/Param")}>Annuler</button>
                        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Enregistrement…" : "Créer le paramètre"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}