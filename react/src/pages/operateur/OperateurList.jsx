import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Operateur.css";

const API = "http://localhost:8080/api";

export default function OperateurList() {
    const [operateurs, setOperateurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/operateurs`)
            .then(r => r.json())
            .then(data => { setOperateurs(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Confirmer la suppression ?")) return;
        setDeletingId(id);
        await fetch(`${API}/operateurs/${id}`, { method: "DELETE" });
        setOperateurs(prev => prev.filter(o => o.id !== id));
        setDeletingId(null);
    };

    return (
        <div className="opera-page">
            <div className="opera-header">
                <div className="opera-header-left">
                    <span className="opera-label">TABLE</span>
                    <h1 className="opera-title">Opérateurs</h1>
                </div>
                <button className="btn-primary" onClick={() => navigate("/Opera/create")}>
                    + Nouvel opérateur
                </button>
            </div>

            {loading ? (
                <div className="opera-loading">Chargement…</div>
            ) : (
                <div className="opera-table-wrapper">
                    <table className="opera-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Symbole</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {operateurs.length === 0 ? (
                                <tr><td colSpan="3" className="empty-row">Aucun opérateur trouvé</td></tr>
                            ) : operateurs.map((o, i) => (
                                <tr key={o.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                    <td className="cell-id">{o.id}</td>
                                    <td>
                                        <span className="badge-opera">{o.operateur}</span>
                                    </td>
                                    <td className="cell-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => navigate(`/Opera/edit/${o.id}`)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(o.id)}
                                            disabled={deletingId === o.id}
                                        >
                                            {deletingId === o.id ? "…" : "Supprimer"}
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