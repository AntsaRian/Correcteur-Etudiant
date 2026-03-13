import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Etudiant.css";

const API = "http://localhost:8080/api";

export default function EtudiantList() {
    const [etudiants, setEtudiants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/etudiants`)
            .then(r => r.json())
            .then(data => { setEtudiants(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Confirmer la suppression ?")) return;
        setDeletingId(id);
        await fetch(`${API}/etudiants/${id}`, { method: "DELETE" });
        setEtudiants(prev => prev.filter(e => e.id !== id));
        setDeletingId(null);
    };

    return (
        <div className="etu-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">TABLE</span>
                    <h1 className="etu-title">Étudiants</h1>
                </div>
                <button className="btn-primary" onClick={() => navigate("/Etudiant/create")}>
                    + Nouvel étudiant
                </button>
            </div>

            {loading ? (
                <div className="etu-loading">Chargement…</div>
            ) : (
                <div className="etu-table-wrapper">
                    <table className="etu-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {etudiants.length === 0 ? (
                                <tr><td colSpan="3" className="empty-row">Aucun étudiant trouvé</td></tr>
                            ) : etudiants.map((e, i) => (
                                <tr key={e.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                    <td className="cell-id">{e.id}</td>
                                    <td className="cell-nom">
                                        <span className="avatar">{e.nom?.charAt(0).toUpperCase()}</span>
                                        {e.nom}
                                    </td>
                                    <td className="cell-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => navigate(`/Etudiant/edit/${e.id}`)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(e.id)}
                                            disabled={deletingId === e.id}
                                        >
                                            {deletingId === e.id ? "…" : "Supprimer"}
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