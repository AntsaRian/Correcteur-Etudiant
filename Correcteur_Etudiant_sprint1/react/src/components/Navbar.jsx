import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <>
            <div className="navbar">
                <button onClick={() => navigate("/")}>
                    Home
                </button>
                <button onClick={() => navigate("/Param")}>
                    Parametre
                </button>
                <button onClick={() => navigate("/Note")}>
                    Note
                </button>
                <button onClick={() => navigate("/Reso")}>
                    Resolution
                </button>
                <button onClick={() => navigate("/Opera")}>
                    Operateur
                </button>
                <button onClick={() => navigate("/Etudiant")}>
                    Etudiant
                </button>
                <button onClick={() => navigate("/Matiere")}>
                    Matiere
                </button>
            </div>
        </>
    )
}