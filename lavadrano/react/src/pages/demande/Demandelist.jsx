import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Etudiant.css";

const API = "http://localhost:8080/api";

export default function DemandeList() {
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/demandes`)
            .then(r => r.json())
            .then(data => { setDemandes(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Confirmer la suppression ?")) return;
        setDeletingId(id);
        await fetch(`${API}/demandes/${id}`, { method: "DELETE" });
        setDemandes(prev => prev.filter(d => d.id !== id));
        setDeletingId(null);
    };

    return (
        <div className="etu-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">TABLE</span>
                    <h1 className="etu-title">Demandes</h1>
                </div>
                <button className="btn-primary" onClick={() => navigate("/Demande/create")}>
                    + Nouvelle demande
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
                                <th>Client</th>
                                <th>Lieu</th>
                                <th>District</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demandes.length === 0 ? (
                                <tr><td colSpan="5" className="empty-row">Aucune demande trouvée</td></tr>
                            ) : demandes.map((d, i) => (
                                <tr key={d.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                    <td className="cell-id">{d.id}</td>
                                    <td className="cell-nom">
                                        <span className="avatar">
                                            {d.client?.nom?.charAt(0).toUpperCase()}
                                        </span>
                                        {d.client?.nom}
                                    </td>
                                    <td>{d.lieu}</td>
                                    <td>
                                        {d.district || "—"}
                                    </td>
                                    <td className="cell-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => navigate(`/Demande/edit/${d.id}`)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(d.id)}
                                            disabled={deletingId === d.id}
                                        >
                                            {deletingId === d.id ? "…" : "Supprimer"}
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