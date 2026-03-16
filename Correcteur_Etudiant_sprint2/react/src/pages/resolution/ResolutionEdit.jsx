import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/Resolution.css";

const API = "http://localhost:8080/api";

export default function ResolutionEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resolution, setResolution] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetch(`${API}/resolutions/${id}`)
            .then(r => r.json())
            .then(data => { setResolution(data.resolution || ""); setFetching(false); })
            .catch(() => setFetching(false));
    }, [id]);

    const handleSubmit = async () => {
        if (!resolution.trim()) {
            setError("La résolution est requise.");
            return;
        }
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/resolutions/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resolution }),
        });

        setLoading(false);
        if (res.ok) {
            navigate("/Reso");
        } else {
            setError("Erreur lors de la mise à jour.");
        }
    };

    if (fetching) return <div className="reso-page"><div className="reso-loading">Chargement…</div></div>;

    return (
        <div className="reso-page">
            <div className="reso-header">
                <div className="reso-header-left">
                    <span className="reso-label">MODIFICATION · #{id}</span>
                    <h1 className="reso-title">Éditer la résolution</h1>
                </div>
                <button className="btn-ghost" onClick={() => navigate("/Reso")}>
                    ← Retour
                </button>
            </div>

            <div className="reso-form-wrapper">
                <div className="reso-form">
                    <div className="form-group">
                        <label>Libellé de la résolution</label>
                        <input
                            type="text"
                            value={resolution}
                            onChange={e => setResolution(e.target.value)}
                            placeholder="ex: plus grand"
                            onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        />
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <div className="form-actions">
                        <button className="btn-ghost" onClick={() => navigate("/Reso")}>Annuler</button>
                        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Mise à jour…" : "Enregistrer les modifications"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}