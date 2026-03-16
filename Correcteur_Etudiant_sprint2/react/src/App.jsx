import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home   from "./pages/Home";
import Navbar from "./components/Navbar";
import Logo   from "./components/Logo";

import ParametreList   from "./pages/parametre/ParametreList";
import ParametreCreate from "./pages/parametre/ParametreCreate";
import ParametreEdit   from "./pages/parametre/ParametreEdit";

import NoteList   from "./pages/note/NoteList";
import NoteCreate from "./pages/note/NoteCreate";
import NoteEdit   from "./pages/note/NoteEdit";

import EtudiantList   from "./pages/etudiant/EtudiantList";
import EtudiantCreate from "./pages/etudiant/EtudiantCreate";
import EtudiantEdit   from "./pages/etudiant/EtudiantEdit";

import MatiereList   from "./pages/matiere/MatiereList";
import MatiereCreate from "./pages/matiere/MatiereCreate";
import MatiereEdit   from "./pages/matiere/MatiereEdit";

import ResolutionList   from "./pages/resolution/ResolutionList";
import ResolutionCreate from "./pages/resolution/ResolutionCreate";
import ResolutionEdit   from "./pages/resolution/ResolutionEdit";

import OperateurList   from "./pages/operateur/OperateurList";
import OperateurCreate from "./pages/operateur/OperateurCreate";
import OperateurEdit   from "./pages/operateur/OperateurEdit";

function App() {
  return (
    <BrowserRouter>
      <Logo />

      <div style={{ paddingBottom: "6rem", paddingTop: "6rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Parametre CRUD */}
          <Route path="/Param"          element={<ParametreList />} />
          <Route path="/Param/create"   element={<ParametreCreate />} />
          <Route path="/Param/edit/:id" element={<ParametreEdit />} />

          {/* Note CRUD */}
          <Route path="/Note"           element={<NoteList />} />
          <Route path="/Note/create"    element={<NoteCreate />} />
          <Route path="/Note/edit/:id"  element={<NoteEdit />} />

          {/* Etudiant CRUD */}
          <Route path="/Etudiant"           element={<EtudiantList />} />
          <Route path="/Etudiant/create"    element={<EtudiantCreate />} />
          <Route path="/Etudiant/edit/:id"  element={<EtudiantEdit />} />

          {/* Matiere CRUD */}
          <Route path="/Matiere"          element={<MatiereList />} />
          <Route path="/Matiere/create"   element={<MatiereCreate />} />
          <Route path="/Matiere/edit/:id" element={<MatiereEdit />} />

          {/* Resolution CRUD */}
          <Route path="/Reso"           element={<ResolutionList />} />
          <Route path="/Reso/create"    element={<ResolutionCreate />} />
          <Route path="/Reso/edit/:id"  element={<ResolutionEdit />} />

          {/* Operateur CRUD */}
          <Route path="/Opera"          element={<OperateurList />} />
          <Route path="/Opera/create"   element={<OperateurCreate />} />
          <Route path="/Opera/edit/:id" element={<OperateurEdit />} />
        </Routes>
      </div>

      <Navbar />
    </BrowserRouter>
  );
}

export default App;