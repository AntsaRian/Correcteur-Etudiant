import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Matiere.css";

const API = "http://localhost:8080/api";

export default function MatiereList() {
    const [matieres, setMatieres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/matieres`)
            .then(r => r.json())
            .then(data => { setMatieres(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Confirmer la suppression ?")) return;
        setDeletingId(id);
        await fetch(`${API}/matieres/${id}`, { method: "DELETE" });
        setMatieres(prev => prev.filter(m => m.id !== id));
        setDeletingId(null);
    };

    return (
        <div className="mat-page">
            <div className="mat-header">
                <div className="mat-header-left">
                    <span className="mat-label">TABLE</span>
                    <h1 className="mat-title">Matières</h1>
                </div>
                <button className="btn-primary" onClick={() => navigate("/Matiere/create")}>
                    + Nouvelle matière
                </button>
            </div>

            {loading ? (
                <div className="mat-loading">Chargement…</div>
            ) : (
                <div className="mat-table-wrapper">
                    <table className="mat-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Coefficient</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matieres.length === 0 ? (
                                <tr><td colSpan="4" className="empty-row">Aucune matière trouvée</td></tr>
                            ) : matieres.map((m, i) => (
                                <tr key={m.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                    <td className="cell-id">{m.id}</td>
                                    <td className="cell-nom">{m.nom}</td>
                                    <td>
                                        <span className="badge-coeff">× {m.coeff ?? "—"}</span>
                                    </td>
                                    <td className="cell-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => navigate(`/Matiere/edit/${m.id}`)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(m.id)}
                                            disabled={deletingId === m.id}
                                        >
                                            {deletingId === m.id ? "…" : "Supprimer"}
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