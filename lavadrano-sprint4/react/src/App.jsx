import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home   from "./pages/Home";
import Navbar from "./components/Navbar";
import Logo   from "./components/Logo";

import ClientList   from "./pages/client/ClientList";
import ClientCreate from "./pages/client/ClientCreate";
import ClientEdit   from "./pages/client/ClientEdit";

import DemandeList   from "./pages/demande/Demandelist";
import DemandeCreate from "./pages/demande/Demandecreate";
import DemandeEdit   from "./pages/demande/Demandeedit";

import TypeDevisList from "./pages/type_devis/typeDevisList";
import TypeDevisCreate from "./pages/type_devis/typeDevisCreate";
import TypeDevisEdit from "./pages/type_devis/typeDevisEdit";

import DevisCreate from "./pages/devis/devisCreate";

import SommeDevis from "./pages/somme_devis/somme_devis";

import StatutList from "./pages/statut/listStatut";
import StatutCreate from "./pages/statut/StatutCreate";
import StatutEdit from "./pages/statut/StatutEdit";

import DemandeStatutList from "./pages/demande_statut/DemandeStatutList";

function App() {
  return (
    <BrowserRouter>
      <Logo />

      <div style={{ paddingBottom: "6rem", paddingTop: "8rem"}}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Etudiant CRUD */}
          <Route path="/Client"           element={<ClientList />} />
          <Route path="/Client/create"    element={<ClientCreate />} />
          <Route path="/Client/edit/:id"  element={<ClientEdit />} />

          <Route path="/Demande"           element={<DemandeList />} />
          <Route path="/Demande/create"    element={<DemandeCreate />} />
          <Route path="/Demande/edit/:id"  element={<DemandeEdit />} />

          <Route path="/TypeDevis"           element={<TypeDevisList />} />
          <Route path="/TypeDevis/create"    element={<TypeDevisCreate />} />
          <Route path="/TypeDevis/edit/:id"  element={<TypeDevisEdit />} />

          <Route path="/Devis"           element={<DevisCreate />} />
          <Route path="/SommeDevis"           element={<SommeDevis />} />

          <Route path="/Statut"           element={<StatutList />} />
          <Route path="/Statut/create"    element={<StatutCreate />} />
          <Route path="/Statut/edit/:id"  element={<StatutEdit />} />

          <Route path="/DemandeStatut"  element={<DemandeStatutList />} />

        </Routes>
      </div>

      <Navbar />
    </BrowserRouter>
  );
}

export default App;