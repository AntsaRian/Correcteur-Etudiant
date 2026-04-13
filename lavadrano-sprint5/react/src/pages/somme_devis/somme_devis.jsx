import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Etudiant.css";

const API = "http://localhost:8080/api";    

export default function SommeDevis() {
    const [somme, setSomme] = useState(0.0);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/somme_devis`)
            .then(r => r.json())
            .then(data => { setSomme(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="etudiant-page">
            <div className="etu-header">
                <div className="etu-header-left">
                    <span className="etu-label">AFFICHAGE</span>
                    <h1 className="etu-title" style={{color:"black"}}>Somme devis</h1>
                </div>
            </div>

            {loading ? (
                <div className="param-loading">Chargement…</div>
            ) : (
                <div className="param-table-wrapper">
                    <h1 className="etu-title">Somme devis previsionnel: {somme}</h1>
                </div>
            )}
        </div>
    );
}