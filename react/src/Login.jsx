import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Login() {

  const [data, setData] = useState({ nom: "", password: "" });
  const [error, setError] = useState("");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function login(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      setError("Login incorrect");
      return;
    }

    const user = await response.json();
    setUser(user);
    navigate("/dashboard");
  }

  return (
    <>
      <h2>Login</h2>
      {error && <p style={{color:"red"}}>{error}</p>}

      <form onSubmit={login}>
        <input name="nom" placeholder="Nom" onChange={handleChange} />
        <br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <br />
        <button type="submit">Login</button>
      </form>

      <button onClick={() => navigate("/register")}>Register</button>
    </>
  );
}