import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home   from "./pages/Home";
import Navbar from "./components/Navbar";
import Logo   from "./components/Logo";

import ClientList   from "./pages/client/ClientList";
import ClientCreate from "./pages/client/ClientCreate";
import ClientEdit   from "./pages/client/ClientEdit";

import DemandeList   from "./pages/demande/DemandeList";
import DemandeCreate from "./pages/demande/DemandeCreate";
import DemandeEdit   from "./pages/demande/DemandeEdit";

import TypeDevisList from "./pages/type_devis/typeDevisList";

import DevisCreate from "./pages/devis/devisCreate";

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
          {/* <Route path="/TypeDevis/create"    element={<TypeDevisCreate />} />
          <Route path="/TypeDevis/edit/:id"  element={<TypeDevisEdit />} /> */}

          <Route path="/Devis"           element={<DevisCreate />} />

        </Routes>
      </div>

      <Navbar />
    </BrowserRouter>
  );
}

export default App;