import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Etudiant.css";

const API = "http://localhost:8080/api";    

export default function TypeDevisList() {
    const [typeDevis, setTypeDevis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/type-devis`)
            .then(r => r.json())
            .then(data => { setTypeDevis(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Confirmer la suppression ?")) return;
        setDeletingId(id);
        await fetch(`${API}/type-devis/${id}`, { method: "DELETE" });
        setTypeDevis(prev => prev.filter(p => p.id !== id));
        setDeletingId(null);
    };

    return (
        <div className="param-page">
            <div className="param-header">
                <div className="param-header-left">
                    <span className="param-label">TABLE</span>
                    <h1 className="param-title">Type devis</h1>
                </div>
                <button className="btn-primary" onClick={() => navigate("/TypeDevis/create")}>
                    + Nouveau type de devis
                </button>
            </div>

            {loading ? (
                <div className="param-loading">Chargement…</div>
            ) : (
                <div className="param-table-wrapper">
                    <table className="param-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Libelle</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {typeDevis.length === 0 ? (
                                <tr><td colSpan="6" className="empty-row">Aucun type devis trouvé</td></tr>
                            ) : typeDevis.map((p, i) => (
                                <tr key={p.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                    <td className="cell-id">{p.id}</td>
                                    <td>{p.libelle || "—"}</td>
                                    <td className="cell-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => navigate(`/TypeDevis/edit/${p.id}`)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(p.id)}
                                            disabled={deletingId === p.id}
                                        >
                                            {deletingId === p.id ? "…" : "Supprimer"}
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