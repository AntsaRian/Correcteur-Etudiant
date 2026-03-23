import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Etudiant.css";

const API = "http://localhost:8080/api";

export default function ClientList() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/clients`)
            .then(r => r.json())
            .then(data => { setClients(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Confirmer la suppression ?")) return;
        setDeletingId(id);
        await fetch(`${API}/clients/${id}`, { method: "DELETE" });
        setClients(prev => prev.filter(e => e.id !== id));
        setDeletingId(null);
    };

    return (
        <div className="etu-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">TABLE</span>
                    <h1 className="etu-title">Clients</h1>
                </div>
                <button className="btn-primary" onClick={() => navigate("/Client/Create")}>
                    + Nouveau client
                </button>
            </div>

            {loading ? (
                <div className="etu-loading">Chargement…</div>
            ) : (
                <div className="etu-table-wrapper">
                    <table className="etu-table">
                        <tbody>
                            {clients.length === 0 ? (
                                <tr><td colSpan="3" className="empty-row">Aucun client trouvé</td></tr>
                            ) : clients.map((e, i) => (
                                <tr key={e.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                    <td className="cell-id">{e.id}</td>
                                    <td className="cell-nom">
                                        <span className="avatar">{e.nom?.charAt(0).toUpperCase()}</span>
                                        {e.nom}
                                    </td>
                                    <td className="cell-nom">
                                        {e.contact}
                                    </td>
                                    <td className="cell-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => navigate(`/Client/Edit/${e.id}`)}
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