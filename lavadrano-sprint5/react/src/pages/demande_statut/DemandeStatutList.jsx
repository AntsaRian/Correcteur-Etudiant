import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Etudiant.css";

const API = "http://localhost:8080/api";

export default function DemandeStatutList() {
    const [demandes, setDemandes] = useState([]);
    const [demandeStatut, setDemandeStatut] = useState([]);
    const [statut, setStatut] = useState([]);
    const [statutSelect, setStatutSelect] = useState('');
    const [modif, setModif] = useState(false);
    const [idModif, setIdModif] = useState(false);
    const [idDemande, setIdDemande] = useState(0);
    const [idStatut, setIdStatut] = useState(0);
    const [observation, setObservation] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        chargerTout();
    }, []);

    function chargerTout() {
        Promise.all([
            fetch(`${API}/demandes`).then(r => r.json()),
            fetch(`${API}/demande-statuts`).then(r => r.json()),
            fetch(`${API}/statuts`).then(r => r.json()),
        ]).then(([d, ds, s]) => {
            setDemandes(d);
            setDemandeStatut(ds);
            setStatut(s);
            setLoading(false);
        });
    }

    function modifierLigne(id) {
        setModif(!modif);
        setIdModif(id);
    }

    async function handleSubmit(idDemande, idStatut, observation) {
        console.log("idDemande ", idDemande);
        console.log("idStatut ", idStatut);
        console.log("observation ", observation);

        setLoading(true);
        setError("");

        const res = await fetch(`${API}/demande-statuts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                demande: { id: parseInt(idDemande) },
                statuts: { id: parseInt(idStatut) },
                observation: observation.trim() || null,
            }),
        });

        setLoading(false);
        if (res.ok) alert("demande statut modifie avec succes");
        setModif(false);
        setIdModif(0);
        chargerTout();
    }

    return (
        <div className="etu-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">TABLE</span>
                    <h1 className="etu-title">Modification statut</h1>
                </div>
            </div>

            <h2 style={{color: "black"}}>Demande</h2>
            {loading ? (
                <div className="etu-loading">Chargement…</div>
            ) : (
                <div className="etu-table-wrapper">
                    <table className="etu-table">
                        <thead>
                            <tr>
                                <th style={{color: "black"}}>#</th>
                                <th style={{color: "black"}}>Client</th>
                                <th style={{color: "black"}}>Lieu</th>
                                <th style={{color: "black"}}>District</th>
                                <th style={{color: "black"}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demandes.length === 0 ? (
                                <tr><td colSpan="5" className="empty-row">Aucune demande trouvée</td></tr>
                            ) : demandes.map((d, i) => (
                                <>
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
                                                onClick={() => modifierLigne(d.id)}
                                            >
                                                {modif && d.id == idModif ? 'Annuler' : 'Modifier'}
                                            </button>
                                            {modif && d.id == idModif && (
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => handleSubmit(d.id, statutSelect, observation)}
                                                >
                                                    Valider
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            {modif && d.id == idModif && (
                                                <div>
                                                    <label htmlFor="libelle">Statut</label>
                                                    <br />
                                                    <br />
                                                    <select 
                                                        style={{color: "black"}} 
                                                        name="statut"                                                     onChange={(e) => setStatutSelect(e.target.value)}
                                                    >
                                                        <option value="">— Sélectionner —</option>
                                                        {statut.map(m => (
                                                            <option key={m.id} value={m.id}>{m.libelle}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            {modif && d.id == idModif && (
                                                <div>
                                                    <label htmlFor="observation">Observation</label>
                                                    <br />
                                                    <br />
                                                    <textarea 
                                                        style={{color: "black"}}
                                                        name="observation" 
                                                        placeholder="Observation..."
                                                        onChange={(e) => setObservation(e.target.value)}
                                                    >
                                                    </textarea>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <br />
            <br />

            <h2 style={{color: "black"}}>Demande statut</h2>
            {loading ? (
                <div className="etu-loading">Chargement…</div>
            ) : (
                <div className="etu-table-wrapper">
                    <table className="etu-table">
                        <thead>
                            <tr>
                                <th style={{color: "black"}}>#</th>
                                <th style={{color: "black"}}>Demande</th>
                                <th style={{color: "black"}}>Statut</th>
                                <th style={{color: "black"}}>Date</th>
                                <th style={{color: "black"}}>Observation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demandeStatut.length === 0 ? (
                                <tr><td colSpan="5" className="empty-row">Aucune demande statut trouvée</td></tr>
                            ) : demandeStatut.map((d, i) => (
                                <tr key={d.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                    <td className="cell-id">{d.id}</td>
                                    <td className="cell-nom">
                                        <span className="avatar">
                                            {d.demande?.client?.nom?.charAt(0).toUpperCase()}
                                        </span>
                                        {d.demande?.client?.nom}
                                    </td>
                                    <td>
                                        { d.statuts.libelle }
                                    </td>
                                    <td>
                                        {d.daty}
                                    </td>
                                    <td>
                                        { d.observation || '' }
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