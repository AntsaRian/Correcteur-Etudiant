import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <>
            <div className="navbar">
                <button onClick={() => navigate("/")}>
                    Accueil
                </button>
                <button onClick={() => navigate("/Client")}>
                    Client
                </button>
                <button onClick={() => navigate("/Demande")}>
                    Demande
                </button>
                <button onClick={() => navigate("/Devis")}>
                    Devis
                </button>
                <button onClick={() => navigate("/TypeDevis")}>
                    Type devis
                </button>
                <button onClick={() => navigate("/SommeDevis")}>
                    Somme devis
                </button>
            </div>
        </>
    )
}