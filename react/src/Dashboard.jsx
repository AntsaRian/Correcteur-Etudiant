import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setUser(null);
    navigate("/");
  }

  if (!user) {
    return <p>Accès refusé</p>;
  }

  return (
    <>
      <h2>Dashboard</h2>
      <p>Bienvenue {user.nom}</p>
      <p>Age: {user.age} ans</p>

      <button onClick={() => navigate("/employees")}>
        Voir employés
      </button>

      <br /><br />
      <button onClick={logout}>Logout</button>
    </>
  );
}