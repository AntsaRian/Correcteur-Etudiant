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
    const [id_devis_insert, setId_devis_insert] = useState(0);

    const [devis, setDevis] = useState({
        type_devis: type_devis_select,
        demande: inputValue
    });

    const [details, setDetails] = useState([
        { id: Date.now(), libelle: "", prix_unitaire: 0, quantite: 1 }
    ]);

    async function get_type_devis() {
        setError("");
        try {
            const response = await fetch(`${API}/type-devis`);
            const json = await response.json();
            setType_devis(json);
        } catch (err) {
            setError("Erreur API");
        }
    }

    useEffect(() => {
        get_type_devis();
    }, []);

    async function handleChangeDemande(e) {
        const val = e.target.value;
        setInputValue(val);

        if (!val) {
            setSuggestions([]);
            setDemande({});
            return;
        }

        setError("");

        try {
            const response = await fetch(`${API}/demandes/search?id=${val}`);
            const json = await response.json();
            setSuggestions(json);
        } catch (err) {
            setError("Erreur API");
        }
    }

    async function get_demande_by_id(id) {
        setSuggestions([]);
        if (!id) return;
        setError("");
        try {
            const response = await fetch(`${API}/demandes/${id}`);
            const json = await response.json();
            setDemande(json);
        } catch (err) {
            setError("Erreur API");
        }
    }

    function id_choisi(id) {
        setInputValue(id);
        setSuggestions([]);
    }

    // Alainy dahol ze efa tao => apiny anle { id: Date.now(), libelle: "", pu: 0, qte: 1 }
    function ajouterLigne() {
        setDetails(prev => [
            ...prev,
            { id: Date.now(), libelle: "", pu: 0, qte: 1 }
        ]);
    }

    // Garder dahol le ao sauf id
    function supprimerLigne(id) {
        if (details.length > 1) {
            setDetails(prev => prev.filter(d => d.id !== id));
        }
    }

    // Mantany izy we ty id ty ve le modifier-nle user amzao, si oui -> ovainy le champ sy valeur sinon ajanony am io
    function handleDetailChange(id, champ, valeur) {
        setDetails(prev => prev.map(d =>
            d.id === id ? { ...d, [champ]: valeur } : d
        ));
    }

    function handleDevis (e) {
        setType_devis_select(e.target.value)
        setDevis({
            type_devis: type_devis_select,
            demande: inputValue
        })
    }

    // Calcul du montant total de tous les détails
    // acc otran we le variable double somme
    // d otran we le variable am boucle for (Double prix : prix_rehetra) {}
    // o -> valeur de départ du total (on commence à zéro)
    const montantTotal = details.reduce((acc, d) => acc + (d.prix_unitaire * d.quantite), 0);

    async function creer_devis_avec_details(e) {
        e.preventDefault();
        setError("");

        const data = {
            demande:    { id: parseInt(inputValue) },
            type_devis: { id: parseInt(type_devis_select) },
            daty: new Date(),
            detail_devis: details.map(d => ({
                libelle:       d.libelle,
                prix_unitaire: d.prix_unitaire,
                quantite:      d.quantite
            }))
        };

        console.log(data);

        try {
            const response = await fetch(`${API}/devis`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);
            setId_devis_insert(result);
            success();
        } catch (error) {
            setError({ api: "Erreur serveur" });
        }
    }

    function clearForm () {
        setInputValue("");
        setSuggestions([]);
        setDemande({});
        setType_devis([]);
        setType_devis_select("");
        setDetails([
            { id: Date.now(), libelle: "", prix_unitaire: 0, quantite: 1 }
        ])
    }

    function success () {
        alert("Devis avec ses lignes inserées, #"+id_devis_insert);
        clearForm();
    }

    return (
        <div className="etu-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">FORMULAIRE</span>
                    <h1 className="etu-title">Nouveau devis</h1>
                </div>
            </div>

            {/* Champ ID Demande */}
            <div className="etu-form-wrapper">
                <div className="etu-form">
                    <div className="form-group">
                        <label>ID Demande</label>
                        <div style={{ position: "relative" }}>
                            <input
                                type="number"
                                value={inputValue}
                                min={1}
                                onChange={handleChangeDemande}
                                onBlur={() => get_demande_by_id(inputValue)}
                                placeholder="Id de la demande..."
                            />
                            {suggestions.length > 0 && (
                                <ul style={{
                                    position: "absolute", top: "100%",
                                    left: 0, right: 0, background: "white",
                                    border: "1.5px solid var(--border)",
                                    borderRadius: "7px", listStyle: "none",
                                    margin: 0, padding: 0, zIndex: 10,
                                    boxShadow: "var(--shadow)",
                                }}>
                                    {suggestions.map((sg) => (
                                        <li
                                            key={sg}
                                            onClick={() => id_choisi(sg)}
                                            style={{
                                                color: "black", padding: "0.7rem 1rem",
                                                cursor: "pointer",
                                                borderBottom: "1px solid var(--border)",
                                            }}
                                        >
                                            #{sg}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    {error && <p className="form-error">{error}</p>}
                </div>
            </div>

            {/* Infos demande */}
            {demande && inputValue && !error && (
                <div className="info_demande">
                    <h3>Client: {demande.client?.nom}</h3>
                    <h5>{demande.client?.contact}</h5>
                    <div className="info_demande_lieu">
                        <p>{demande.lieu}</p>/
                        <p>({demande.district})</p>
                    </div>
                </div>
            )}

            {/* Formulaire devis */}
            {inputValue && !error && (
                <div className="etu-form-wrapper">
                    <div className="etu-form">
                        <div className="form-group">
                            <form onSubmit={creer_devis_avec_details}>
                                <p>Type de devis</p>
                                <select
                                    className="form-select"
                                    value={type_devis_select}
                                    onChange={handleDevis}
                                >
                                    <option value="">Choisir</option>
                                    {type_devis.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.libelle}
                                        </option>
                                    ))}
                                </select>

                                <div className="details-devis-form">
                                    {/* Entête */}
                                    <div className="details-devis-header">
                                        <span>Libellé</span>
                                        <span>P.U</span>
                                        <span>Quantité</span>
                                        <span>Montant</span>
                                        <span></span>
                                    </div>

                                    {/* Lignes */}
                                    {details.map((d) => (
                                        <div key={d.id} className="details-devis-form-div">
                                            <input value={d.libelle} onChange={(e) => handleDetailChange(d.id, "libelle", e.target.value)} />
                                            <input type="number" value={d.pu} onChange={(e) => handleDetailChange(d.id, "prix_unitaire", parseFloat(e.target.value) || 0)} />
                                            <input type="number" value={d.qte} onChange={(e) => handleDetailChange(d.id, "quantite", parseInt(e.target.value) || 1)} />
                                            <span className="montant-cell">{(d.prix_unitaire * d.quantite).toLocaleString()} Ar</span>
                                            <div className={`btn-ligne-delete ${details.length <= 1 ? "disabled" : ""}`}
                                                onClick={() => supprimerLigne(d.id)}>
                                                <img src={close} />
                                            </div>
                                        </div>
                                    ))}

                                    {/* Ajouter */}
                                    <div className="details-devis-add" onClick={ajouterLigne}>
                                        <img src={plus} /> Ajouter une ligne
                                    </div>

                                    {/* Total */}
                                    <div className="details-devis-total">
                                        <span>Total</span>
                                        <strong>{montantTotal.toLocaleString()} Ar</strong>
                                    </div>
                                </div>

                                {/* Bouton soumettre */}
                                <div className="form-actions" style={{ marginTop: "1rem" }}>
                                    <button className="btn-primary">
                                        Créer le devis
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}