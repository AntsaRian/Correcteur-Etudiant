import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Etudiant.css";

const API = "http://localhost:8080/api";

export default function TypeDevisList() {
    const [typedevis, setTypeDevis] = useState([]);
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
        setTypeDevis(prev => prev.filter(e => e.id !== id));
        setDeletingId(null);
    };

    return (
        <div className="etu-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">TABLE</span>
                    <h1 className="etu-title">Type devis</h1>
                </div>
                <button className="btn-primary" onClick={() => navigate("/TypeDevis/create")}>
                    + Nouveau type devis
                </button>
            </div>

            {loading ? (
                <div className="etu-loading">Chargement…</div>
            ) : (
                <div className="etu-table-wrapper">
                    <table className="etu-table">
                        <tbody>
                            {typedevis.length === 0 ? (
                                <tr><td colSpan="3" className="empty-row">Aucun type devis trouvé</td></tr>
                            ) : typedevis.map((e, i) => (
                                <tr key={e.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                    <td className="cell-id">{e.id}</td>
                                    <td className="cell-nom">
                                        <span className="avatar">{e.libelle?.charAt(0).toUpperCase()}</span>
                                        {e.libelle}
                                    </td>
                                    <td className="cell-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => navigate(`/TypeDevis/edit/${e.id}`)}
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