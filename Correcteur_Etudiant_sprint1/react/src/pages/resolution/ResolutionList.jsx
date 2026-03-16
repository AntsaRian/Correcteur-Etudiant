import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Resolution.css";

const API = "http://localhost:8080/api";

export default function ResolutionList() {
    const [resolutions, setResolutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/resolutions`)
            .then(r => r.json())
            .then(data => { setResolutions(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Confirmer la suppression ?")) return;
        setDeletingId(id);
        await fetch(`${API}/resolutions/${id}`, { method: "DELETE" });
        setResolutions(prev => prev.filter(r => r.id !== id));
        setDeletingId(null);
    };

    return (
        <div className="reso-page">
            <div className="reso-header">
                <div className="reso-header-left">
                    <span className="reso-label">TABLE</span>
                    <h1 className="reso-title">Résolutions</h1>
                </div>
                <button className="btn-primary" onClick={() => navigate("/Reso/create")}>
                    + Nouvelle résolution
                </button>
            </div>

            {loading ? (
                <div className="reso-loading">Chargement…</div>
            ) : (
                <div className="reso-table-wrapper">
                    <table className="reso-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Résolution</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resolutions.length === 0 ? (
                                <tr><td colSpan="3" className="empty-row">Aucune résolution trouvée</td></tr>
                            ) : resolutions.map((r, i) => (
                                <tr key={r.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                    <td className="cell-id">{r.id}</td>
                                    <td>
                                        <span className="badge-reso">{r.resolution}</span>
                                    </td>
                                    <td className="cell-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => navigate(`/Reso/edit/${r.id}`)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(r.id)}
                                            disabled={deletingId === r.id}
                                        >
                                            {deletingId === r.id ? "…" : "Supprimer"}
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