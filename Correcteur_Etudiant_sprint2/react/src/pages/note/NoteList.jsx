import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Note.css";

const API = "http://localhost:8080/api";

export default function NoteList() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/notes`)
            .then(r => r.json())
            .then(data => { setNotes(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Confirmer la suppression ?")) return;
        setDeletingId(id);
        await fetch(`${API}/notes/${id}`, { method: "DELETE" });
        setNotes(prev => prev.filter(n => n.id !== id));
        setDeletingId(null);
    };

    const getNoteColor = (note) => {
        if (note >= 14) return "badge-note good";
        if (note >= 10) return "badge-note mid";
        return "badge-note low";
    };

    return (
        <div className="note-page">
            <div className="note-header">
                <div className="note-header-left">
                    <span className="note-label">TABLE</span>
                    <h1 className="note-title">Notes</h1>
                </div>
                <button className="btn-primary" onClick={() => navigate("/Note/create")}>
                    + Nouvelle note
                </button>
            </div>

            {loading ? (
                <div className="note-loading">Chargement…</div>
            ) : (
                <div className="note-table-wrapper">
                    <table className="note-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Étudiant</th>
                                <th>Matière</th>
                                <th>Note</th>
                                <th>Correcteur</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.length === 0 ? (
                                <tr><td colSpan="6" className="empty-row">Aucune note trouvée</td></tr>
                            ) : notes.map((n, i) => (
                                <tr key={n.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                    <td className="cell-id">{n.id}</td>
                                    <td>{n.etudiant?.nom || "—"}</td>
                                    <td>{n.matiere?.nom || "—"}</td>
                                    <td>
                                        <span className={getNoteColor(n.note)}>
                                            {n.note}
                                        </span>
                                    </td>
                                    <td>{n.correcteur?.nom || "—"}</td>
                                    <td className="cell-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => navigate(`/Note/edit/${n.id}`)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(n.id)}
                                            disabled={deletingId === n.id}
                                        >
                                            {deletingId === n.id ? "…" : "Supprimer"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}