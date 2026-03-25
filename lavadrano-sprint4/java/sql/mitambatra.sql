CREATE DATABASE lavadrano;
\c lavadrano;

-- 1. CLIENT
CREATE TABLE client (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    contact VARCHAR(100)
);

-- 2. ENTREPRISE
CREATE TABLE entreprise (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    contact VARCHAR(100)
);

-- 3. STATUT ETUDE
CREATE TABLE statut_etude (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

-- 4. TYPE SOL
CREATE TABLE type_sol (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

-- 5. TYPE TUBE
CREATE TABLE type_tube (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

-- 6. OPERATEUR
CREATE TABLE operateur (
    id SERIAL PRIMARY KEY,
    signe CHAR(5) NOT NULL
);

-- 7. ETAPE
CREATE TABLE etape (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    ordre INT NOT NULL
);

-- 8. TOERANA
CREATE TABLE toerana (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse TEXT,
    idclient INT REFERENCES client(id) NOT NULL,
    id_type_sol INT REFERENCES type_sol(id) NOT NULL
);

-- 9. LAVADRANO
CREATE TABLE lavadrano (
    id SERIAL PRIMARY KEY,
    ref VARCHAR(30) NOT NULL,
    nom VARCHAR(100),
    idtoerana INT REFERENCES toerana(id) NOT NULL,
    id_client INT REFERENCES client(id) NOT NULL,
    id_entreprise INT REFERENCES entreprise(id) NOT NULL,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. DISTANCE
CREATE TABLE distance (
    id SERIAL PRIMARY KEY,
    id_source INT REFERENCES toerana(id) NOT NULL,
    id_destination INT REFERENCES toerana(id) NOT NULL,
    distance_km DECIMAL(10,2) NOT NULL
);

-- 11. ETUDE PHASE GLOBALE
CREATE TABLE etude_phase_globale (
    id SERIAL PRIMARY KEY,
    idtoerana INT REFERENCES toerana(id) NOT NULL,
    identreprise INT REFERENCES entreprise(id) NOT NULL,
    idstatut_etude INT REFERENCES statut_etude(id) NOT NULL
);

-- 12. DEVIS
CREATE TABLE devis (
    id SERIAL PRIMARY KEY,
    id_etude_phase_globale INT REFERENCES etude_phase_globale(id) NOT NULL,
    montant NUMERIC(10,2) NOT NULL
);

-- 13. ETUDE PHASE 1
CREATE TABLE etude_phase1 (
    id SERIAL PRIMARY KEY,
    idetude_phase_globale INT REFERENCES etude_phase_globale(id) NOT NULL,
    date_visite DATE,
    observations TEXT,
    idstatut_etude INT REFERENCES statut_etude(id)
);

-- 14. ETUDE PHASE 2
CREATE TABLE etude_phase2 (
    id SERIAL PRIMARY KEY,
    idetude_phase_globale INT REFERENCES etude_phase_globale(id) NOT NULL,
    date_analyse DATE,
    analyse_sous_sol TEXT,
    profondeur VARCHAR(50),
    idstatut_etude INT REFERENCES statut_etude(id)
);

-- 15. HISTORIQUE ETUDE
CREATE TABLE historique_etude (
    id SERIAL PRIMARY KEY,
    idetude_phase_globale INT REFERENCES etude_phase_globale(id) NOT NULL,
    idetude_phase1 INT REFERENCES etude_phase1(id),
    idetude_phase2 INT REFERENCES etude_phase2(id),
    date_action DATE,
    idstatut_etude INT REFERENCES statut_etude(id),
    commentaire TEXT
);

-- 16. DEVIS ETUDE
CREATE TABLE devis_etude (
    id SERIAL PRIMARY KEY,
    id_devis INT REFERENCES devis(id) NOT NULL,
    id_etape INT REFERENCES etape(id) NOT NULL,
    id_distance INT REFERENCES distance(id) NOT NULL,
    id_operateur INT REFERENCES operateur(id) NOT NULL,
    cout DECIMAL(12,2) NOT NULL
);

-- 17. DEVIS FORAGE
CREATE TABLE devis_forage (
    id SERIAL PRIMARY KEY,
    id_devis INT REFERENCES devis(id) NOT NULL,
    id_etape INT REFERENCES etape(id) NOT NULL,
    id_type_sol INT REFERENCES type_sol(id) NOT NULL,
    cout_metre DECIMAL(10,2) NOT NULL
);

-- 18. DEVIS TUBE
CREATE TABLE devis_tube (
    id SERIAL PRIMARY KEY,
    id_devis INT REFERENCES devis(id) NOT NULL,
    id_etape INT REFERENCES etape(id) NOT NULL,
    id_type_tube INT REFERENCES type_tube(id) NOT NULL,
    cout_metre DECIMAL(10,2) NOT NULL
);

-- 19. DEVIS TEST SANITAIRE
CREATE TABLE devis_test_sanitaire (
    id SERIAL PRIMARY KEY,
    id_devis INT REFERENCES devis(id) NOT NULL,
    id_etape INT REFERENCES etape(id) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    cout DECIMAL(12,2) NOT NULL
);

-- 20. REALISATION CREUSEMENT
CREATE TABLE realisation_creusement (
    id SERIAL PRIMARY KEY,
    idetude_phase_globale INT UNIQUE REFERENCES etude_phase_globale(id),
    date_debut_creusement DATE,
    date_fin_creusement DATE,
    profondeur_atteinte VARCHAR(50),
    type_sol_rencontre TEXT,
    difficulte_rencontree TEXT,
    idstatut_etude INT REFERENCES statut_etude(id),
    observations TEXT
);

-- 21. REALISATION EAU
CREATE TABLE realisation_eau (
    id SERIAL PRIMARY KEY,
    idetude_phase_globale INT UNIQUE REFERENCES etude_phase_globale(id),
    date_decouverte_eau DATE,
    profondeur_eau VARCHAR(50),
    debit_estime VARCHAR(50),
    qualite_apparente VARCHAR(100),
    idstatut_etude INT REFERENCES statut_etude(id),
    observations TEXT
);

-- 22. REALISATION TEST SANITAIRE
CREATE TABLE realisation_test_sanitaire (
    id SERIAL PRIMARY KEY,
    idetude_phase_globale INT UNIQUE REFERENCES etude_phase_globale(id),
    date_prelevement DATE,
    date_analyse DATE,
    laboratoire VARCHAR(100),
    parametres_physiques TEXT,
    parametres_chimiques TEXT,
    parametres_bacteriologiques TEXT,
    conformite VARCHAR(20),
    date_resultat DATE,
    recommandations TEXT,
    idstatut_etude INT REFERENCES statut_etude(id)
);

-- 23. REALISATION POMPAGE
CREATE TABLE realisation_pompage (
    id SERIAL PRIMARY KEY,
    idetude_phase_globale INT UNIQUE REFERENCES etude_phase_globale(id),
    date_test DATE,
    duree_test VARCHAR(50),
    debit_pompage VARCHAR(50),
    niveau_statique VARCHAR(50),
    niveau_dynamique VARCHAR(50),
    rabattement VARCHAR(50),
    conclusions TEXT,
    idstatut_etude INT REFERENCES statut_etude(id)
);

-- 24. REALISATION EQUIPEMENT
CREATE TABLE realisation_equipement (
    id SERIAL PRIMARY KEY,
    idetude_phase_globale INT UNIQUE REFERENCES etude_phase_globale(id),
    date_installation DATE,
    type_pompe VARCHAR(100),
    puissance_pompe VARCHAR(50),
    profondeur_installation VARCHAR(50),
    type_canalisation VARCHAR(100),
    date_mise_service DATE,
    observations TEXT,
    idstatut_etude INT REFERENCES statut_etude(id)
);

-- 25. HISTORIQUE REALISATION
CREATE TABLE historique_realisation (
    id SERIAL PRIMARY KEY,
    id_realisation_creusement INT REFERENCES realisation_creusement(id),
    id_realisation_eau INT REFERENCES realisation_eau(id),
    id_realisation_test_sanitaire INT REFERENCES realisation_test_sanitaire(id),
    id_realisation_pompage INT REFERENCES realisation_pompage(id),
    id_realisation_equipement INT REFERENCES realisation_equipement(id),
    action VARCHAR(200),
    date_action TIMESTAMP,
    idstatut_etude INT REFERENCES statut_etude(id),
    commentaire TEXT
);