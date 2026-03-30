import { useState, useEffect } from "react";
import "../../assets/css/devisCreate.css";
import close from "../../assets/img/xmark-solid-full.svg"
import plus from "../../assets/img/plus-solid-full.svg"

const API = "http://localhost:8080/api";

export default function DevisCreate() {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [demande, setDemande] = useState({});
    const [error, setError] = useState("");
    const [type_devis, setType_devis] = useState([]);
    const [type_devis_select, setType_devis_select] = useState("");
    const [allDevis, setAllDevis] = useState([]);        
    const [loadingDevis, setLoadingDevis] = useState(true);

    const [details, setDetails] = useState([
        { id: Date.now(), libelle: "", prix_unitaire: 0, quantite: 1 }
    ]);

    // ── Chargement initial ─────────────────────────────────────────────────
    useEffect(() => {
        get_type_devis();
        get_all_devis(); 
    }, []);

    async function get_type_devis() {
        try {
            const res  = await fetch(`${API}/type-devis`);
            const json = await res.json();
            setType_devis(json);
        } catch { setError("Erreur API type devis"); }
    }

    async function get_all_devis() {
        setLoadingDevis(true);
        try {
            const res  = await fetch(`${API}/devis`);
            const json = await res.json();
            setAllDevis(json);
        } catch { setError("Erreur API devis"); }
        finally { setLoadingDevis(false); }
    }

    // ── Autocomplete demande ───────────────────────────────────────────────
    async function handleChangeDemande(e) {
        const val = e.target.value;
        setInputValue(val);
        if (!val) { setSuggestions([]); setDemande({}); return; }
        setError("");
        try {
            const res  = await fetch(`${API}/demandes/search?id=${val}`);
            const json = await res.json();
            setSuggestions(json);
        } catch { setError("Erreur API"); }
    }

    async function get_demande_by_id(id) {
        setSuggestions([]);
        if (!id) return;
        try {
            const res  = await fetch(`${API}/demandes/${id}`);
            const json = await res.json();
            setDemande(json);
        } catch { setError("Erreur API"); }
    }

    function id_choisi(id) { setInputValue(id); setSuggestions([]); }

    // ── Gestion des lignes ─────────────────────────────────────────────────
    function ajouterLigne() {
        setDetails(prev => [...prev, { id: Date.now(), libelle: "", prix_unitaire: 0, quantite: 1 }]);
    }

    function supprimerLigne(id) {
        if (details.length > 1) setDetails(prev => prev.filter(d => d.id !== id));
    }

    function handleDetailChange(id, champ, valeur) {
        setDetails(prev => prev.map(d => d.id === id ? { ...d, [champ]: valeur } : d));
    }

    const montantTotal = details.reduce((acc, d) => acc + (d.prix_unitaire * d.quantite), 0);

    // ── Soumission ─────────────────────────────────────────────────────────
    async function creer_devis_avec_details(e) {
        e.preventDefault();
        setError("");

        if (!inputValue)        { setError("Id demande obligatoire"); return; }
        if (!type_devis_select) { setError("Type devis obligatoire"); return; }

        const data = {
            demande:     { id: parseInt(inputValue) },
            type_devis:  { id: parseInt(type_devis_select) },
            daty: new Date().toISOString().split("T")[0],
            detail_devis: details.map(d => ({
                libelle:       d.libelle,
                prix_unitaire: parseFloat(d.prix_unitaire),
                quantite:      parseInt(d.quantite)
            }))
        };

        try {
            const response = await fetch(`${API}/devis`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const id = await response.json();
                alert("Devis créé avec succès, #" + id);
                clearForm();
                get_all_devis();
            } else {
                const msg = await response.text();
                setError(msg || "Erreur lors de la création");
            }
        } catch { setError("Erreur serveur"); }
    }

    function clearForm() {
        setInputValue(""); setSuggestions([]); setDemande({});
        setType_devis_select("");
        setDetails([{ id: Date.now(), libelle: "", prix_unitaire: 0, quantite: 1 }]);
        get_type_devis();
    }

    // ── Suppression depuis la liste ────────────────────────────────────────
    async function handleDelete(id) {
        if (!confirm("Supprimer ce devis et ses détails ?")) return;
        await fetch(`${API}/devis/${id}`, { method: "DELETE" });
        get_all_devis();
    }

    // ── Rendu ──────────────────────────────────────────────────────────────
    return (
        <div className="etu-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">FORMULAIRE</span>
                    <h1 className="etu-title">Nouveau devis</h1>
                </div>
            </div>

            {/* ── Champ ID Demande ── */}
            <div className="etu-form-wrapper">
                <div className="etu-form">
                    <div className="form-group">
                        <label>ID Demande</label>
                        <div style={{ position: "relative" }}>
                            <input
                                type="number" value={inputValue} min={1}
                                onChange={handleChangeDemande}
                                onBlur={() => get_demande_by_id(inputValue)}
                                placeholder="Id de la demande..."
                            />
                            {suggestions.length > 0 && (
                                <ul style={{
                                    position: "absolute", top: "100%", left: 0, right: 0,
                                    background: "white", border: "1.5px solid var(--border)",
                                    borderRadius: "7px", listStyle: "none",
                                    margin: 0, padding: 0, zIndex: 10, boxShadow: "var(--shadow)",
                                }}>
                                    {suggestions.map(sg => (
                                        <li key={sg} onClick={() => id_choisi(sg)} style={{
                                            color: "black", padding: "0.7rem 1rem",
                                            cursor: "pointer", borderBottom: "1px solid var(--border)",
                                        }}>#{sg}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    {error && <p className="form-error">{error}</p>}
                </div>
            </div>

            {/* ── Infos demande ── */}
            {demande?.client && inputValue && !error && (
                <div className="info_demande">
                    <h3>Client : {demande.client?.nom}</h3>
                    <h5>{demande.client?.contact}</h5>
                    <div className="info_demande_lieu">
                        <p>{demande.lieu}</p> / <p>({demande.district})</p>
                    </div>
                </div>
            )}

            {/* ── Formulaire devis ── */}
            {inputValue && !error && (
                <div className="etu-form-wrapper">
                    <div className="etu-form">
                        <div className="form-group">
                            <form onSubmit={creer_devis_avec_details}>
                                <p>Type de devis</p>
                                <select className="form-select" value={type_devis_select}
                                    onChange={e => setType_devis_select(e.target.value)} required>
                                    <option value="">Choisir</option>
                                    {type_devis.map(m => (
                                        <option key={m.id} value={m.id}>{m.libelle}</option>
                                    ))}
                                </select>

                                <div className="details-devis-form">
                                    <div className="details-devis-header">
                                        <span>Libellé</span>
                                        <span>P.U</span>
                                        <span>Quantité</span>
                                        <span>Montant</span>
                                        <span></span>
                                    </div>

                                    {details.map(d => (
                                        <div key={d.id} className="details-devis-form-div">
                                            <input value={d.libelle}
                                                onChange={e => handleDetailChange(d.id, "libelle", e.target.value)} required />
                                            <input type="number" value={d.prix_unitaire}
                                                onChange={e => handleDetailChange(d.id, "prix_unitaire", parseFloat(e.target.value) || 0)} />
                                            <input type="number" value={d.quantite}
                                                onChange={e => handleDetailChange(d.id, "quantite", parseInt(e.target.value) || 1)} />
                                            <span className="montant-cell">
                                                {(d.prix_unitaire * d.quantite).toLocaleString()} Ar
                                            </span>
                                            <div className={`btn-ligne-delete ${details.length <= 1 ? "disabled" : ""}`}
                                                onClick={() => supprimerLigne(d.id)}>
                                                <img src={close} />
                                            </div>
                                        </div>
                                    ))}

                                    <div className="details-devis-add" onClick={ajouterLigne}>
                                        <img src={plus} /> Ajouter une ligne
                                    </div>

                                    <div className="details-devis-total">
                                        <span>Total</span>
                                        <strong>{montantTotal.toLocaleString()} Ar</strong>
                                    </div>
                                </div>

                                <div className="form-actions" style={{ marginTop: "1rem" }}>
                                    <button className="btn-primary">Créer le devis</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Liste des devis ── */}
            <div style={{ marginTop: "3rem" }}>
                <div className="etu-header" style={{ marginBottom: "1.2rem" }}>
                    <div className="etu-header-left">
                        <span className="etu-label">TABLE</span>
                        <h1 className="etu-title">Devis enregistrés</h1>
                    </div>
                </div>

                {loadingDevis ? (
                    <div className="etu-loading">Chargement…</div>
                ) : (
                    <div className="etu-table-wrapper">
                        <table className="etu-table">
                            <thead>
                                <tr>
                                    <th style={{color: "black"}}>#</th>
                                    <th style={{color: "black"}}>Client</th>
                                    <th style={{color: "black"}}>Lieu</th>
                                    <th style={{color: "black"}}>Type devis</th>
                                    <th style={{color: "black"}}>Statut</th>
                                    <th style={{color: "black"}}>Date</th>
                                    <th style={{color: "black"}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allDevis.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-row">Aucun devis trouvé</td>
                                    </tr>
                                    ) : allDevis.map((dv, i) => (
                                        <tr key={dv[0].id || i} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                                            <td className="cell-id">{dv[0].id}</td>
                                            <td className="cell-nom">
                                                <span className="avatar">
                                                    {dv[0].demande?.client?.nom?.charAt(0).toUpperCase()}
                                                </span>
                                                {dv[0].demande?.client?.nom}
                                            </td>
                                            <td>{dv[0].demande?.lieu}</td>
                                            <td>{dv[0].type_devis?.libelle}</td>
                                            <td>{dv[1].statuts?.libelle}</td>
                                            <td>{dv[1].daty}</td>
                                            <td className="cell-actions">
                                                <button className="btn-delete"
                                                    onClick={() => handleDelete(dv[0].id)}>
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}