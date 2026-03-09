import { useEffect, useState } from "react";

export default function Employees() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  return (
    <>
      <h2>Liste des employés</h2>

      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.nom} {emp.prenom}
          </li>
        ))}
      </ul>
    </>
  );
}