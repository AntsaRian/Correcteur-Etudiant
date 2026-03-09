import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Parametre.css";

const API = "http://localhost:8080/api";

export default function ParametreList() {
    const [parametres, setParametres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/parametres`)
            .then(r => r.json())
            .then(data => { setParametres(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Confirmer la suppression ?")) return;
        setDeletingId(id);
        await fetch(`${API}/parametres/${id}`, { method: "DELETE" });
        setParametres(prev => prev.filter(p => p.id !== id));
        setDeletingId(null);
    };

    return (
        <div className="param-page">
            <div className="param-header">
                <div className="param-header-left">
                    <span className="param-label">TABLE</span>
                    <h1 className="param-title">Paramètres</h1>
                </div>
                <button className="btn-primary" onClick={() => navigate("/Param/create")}>
                    + Nouveau paramètre
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
                                <th>Matière</th>
                                <th>Opérateur</th>
                                <th>Diff</th>
                                <th>Résolution</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parametres.length === 0 ? (
                                <tr><td colSpan="6" className="empty-row">Aucun paramètre trouvé</td></tr>
                            ) : parametres.map((p, i) => (
                                <tr key={p.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                    <td className="cell-id">{p.id}</td>
                                    <td>{p.matiere?.nom || "—"}</td>
                                    <td>{p.operateur?.symbole || p.operateur?.nom || "—"}</td>
                                    <td><span className="badge-diff">{p.diff}</span></td>
                                    <td>{p.resolution?.nom || "—"}</td>
                                    <td className="cell-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => navigate(`/Param/edit/${p.id}`)}
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