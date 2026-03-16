import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/Note.css";

const API = "http://localhost:8080/api";

export default function NoteEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [matieres, setMatieres] = useState([]);
    const [etudiants, setEtudiants] = useState([]);
    const [correcteurs, setCorrecteurs] = useState([]);
    const [form, setForm] = useState({
        id_matiere: "",
        note: "",
        id_correcteur: "",
        id_etudiant: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`${API}/matieres`).then(r => r.json()),
            fetch(`${API}/etudiants`).then(r => r.json()),
            fetch(`${API}/correcteurs`).then(r => r.json()),
            fetch(`${API}/notes/${id}`).then(r => r.json()),
        ]).then(([m, e, c, n]) => {
            setMatieres(m);
            setEtudiants(e);
            setCorrecteurs(c);
            setForm({
                id_matiere:    n.matiere?.id    || "",
                note:          n.note           || "",
                id_correcteur: n.correcteur?.id || "",
                id_etudiant:   n.etudiant?.id   || "",
            });
            setFetching(false);
        });
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.id_matiere || !form.note || !form.id_correcteur || !form.id_etudiant) {
            setError("Tous les champs sont requis.");
            return;
        }
        const noteVal = parseFloat(form.note);
        if (noteVal < 0 || noteVal > 20) {
            setError("La note doit être entre 0 et 20.");
            return;
        }
        setLoading(true);
        setError("");

        const body = {
            matiere:    { id: parseInt(form.id_matiere) },
            note:       noteVal,
            correcteur: { id: parseInt(form.id_correcteur) },
            etudiant:   { id: parseInt(form.id_etudiant) },
        };

        const res = await fetch(`${API}/notes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        setLoading(false);
        if (res.ok) {
            navigate("/Note");
        } else {
            setError("Erreur lors de la mise à jour.");
        }
    };

    if (fetching) return <div className="note-page"><div className="note-loading">Chargement…</div></div>;

    return (
        <div className="note-page">
            <div className="note-header">
                <div className="note-header-left">
                    <span className="note-label">MODIFICATION · #{id}</span>
                    <h1 className="note-title">Éditer la note</h1>
                </div>
                <button className="btn-ghost" onClick={() => navigate("/Note")}>
                    ← Retour
                </button>
            </div>

            <div className="note-form-wrapper">
                <div className="note-form">

                    <div className="form-group">
                        <label>Étudiant</label>
                        <select name="id_etudiant" value={form.id_etudiant} onChange={handleChange}>
                            <option value="">— Sélectionner —</option>
                            {etudiants.map(e => (
                                <option key={e.id} value={e.id}>{e.nom}</option>
                            ))}
                        </select>
                    </div>

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
                        <label>Note <span className="label-hint">(0 — 20)</span></label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="20"
                            name="note"
                            value={form.note}
                            onChange={handleChange}
                            placeholder="ex: 14.50"
                        />
                    </div>

                    <div className="form-group">
                        <label>Correcteur</label>
                        <select name="id_correcteur" value={form.id_correcteur} onChange={handleChange}>
                            <option value="">— Sélectionner —</option>
                            {correcteurs.map(c => (
                                <option key={c.id} value={c.id}>{c.nom}</option>
                            ))}
                        </select>
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div className="form-actions">
                        <button className="btn-ghost" onClick={() => navigate("/Note")}>Annuler</button>
                        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Mise à jour…" : "Enregistrer les modifications"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}