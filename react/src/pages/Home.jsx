import { useState, useEffect } from "react";

export default function Home() {

    const [etudiants, setEtudiants] = useState([]);
    const [matieres, setMatieres] = useState([]);

    const [data, setData] = useState({
        id_etudiant: "",
        id_matiere: ""
    });

    const [resultat, setResultat] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    async function getEtudiants() {
        try {
            const response = await fetch("http://localhost:8080/api/etudiants");
            const json = await response.json();
            setEtudiants(json);
        } catch (err) {
            setError("Erreur chargement étudiants");
        }
    }


    async function getMatieres() {
        try {
            const response = await fetch("http://localhost:8080/api/matieres");
            const json = await response.json();
            setMatieres(json);
        } catch (err) {
            setError("Erreur chargement matières");
        }
    }


    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }


    async function voir_note(e) {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/api/note", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);
            setResultat(result);

        } catch (err) {
            setError("Erreur serveur");
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getEtudiants();
        getMatieres();
    }, []);


    return (
        <div style={{ textAlign: "center" }} className="form">

            <h1>Plateforme des résultats de l'examen officiel</h1>
            <h2>ETU003533</h2>

            {error && <p style={{color:"red"}}>{error}</p>}

            <form onSubmit={voir_note}>

                <div className="select">

                    <div className="select-group">
                        <h3>Choisir étudiant</h3>
                        <select
                            name="id_etudiant"
                            value={data.id_etudiant}
                            onChange={handleChange}
                        >
                            <option value=""> Choisir étudiant </option>
                            {etudiants.map((etu) => (
                                <option key={etu.id} value={etu.id}>{etu.nom}</option>
                            ))}
                        </select>
                    </div>

                    <div className="select-group">
                        <h3>Choisir matière</h3>
                        <select
                            name="id_matiere"
                            value={data.id_matiere}
                            onChange={handleChange}
                        >
                            <option value=""> Choisir matière </option>
                            {matieres.map((m) => (
                                <option key={m.id} value={m.id}>{m.nom}</option>
                            ))}
                        </select>
                    </div>

                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Chargement..." : "Voir note"}
                </button>

            </form>


            {resultat && (
                <div style={{marginTop: 20}} className="result">
                    <h2>Résultat</h2>
                    <p style={{
                        color: resultat > 12 ? 'green' : resultat >= 10 ? 'orange' : 'red'
                    }}>
                        Note : {resultat} / 20
                    </p>
                </div>
            )}

        </div>
    );
}