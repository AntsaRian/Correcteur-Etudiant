client :
  id,
  nom,
  contact,
  date_creation

entreprise :
  id,
  nom,
  contact,
  date_creation

toerana :
  id,
  nom,
  adresse,
  idclient  -- Lien avec client

  etude :

  id,
  idtoerana,           -- Terrain concerné
  identreprise,        -- Entreprise qui fait l'étude
   idtype_etude
  id_etude_parent,     -- NULL pour VISITE, ID de la VISITE pour GEOPHYSIQUE
  date_etude,          -- Date de la visite/analyse
  observations,        -- Compte-rendu
  devis_montant,       -- Devis proposé
  



  -- 1. Table des types d'étude (pour avoir une liste propre)
type_etude :
  id INT PRIMARY KEY AUTO_INCREMENT,

  nom VARCHAR(50) NOT NULL,    -- 'VISITE', 'GEOPHYSIQUE', 'FORAGE'      
  description TEXT,
  ordre_phase INT;                  -- 1 pour VISITE, 2 pour GEOPHYSIQUE, 3 pour FORAGE
  
  


statut_etude :
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(50) NOT NULL,           -- 'En attente', 'Accepté', 'Refusé', 'En cours', 'Terminé'


historique :
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_etude INT NOT NULL,           -- L'étude concernée
  -- 'CREATION', 'ACCEPTATION', 'REFUS', 'MODIFICATION'
  commentaire TEXT,                  -- Explication de l'action
  date_action TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id statut_etude,
  FOREIGN KEY (id_etude) REFERENCES etude(id)




-- autre 


je vais faire  base de forage fIT PAR CLIENT  et entreprise et il les etude  que le entrepsie fasse visite lieu  de  fasse devis et pares si client veut contenue et entrpeise fait etude  geophysique
de fait encore devis

-- 1. CLIENT
CREATE TABLE client (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100)
);

-- 2. ENTREPRISE
CREATE TABLE entreprise (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    contact VARCHAR(100)
);

-- 3. STATUT_ETUDE
CREATE TABLE statut_etude (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

-- 4. TOERANA (terrains)
CREATE TABLE toerana (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    adresse TEXT,
    idclient INT REFERENCES client(id)
);

-- 5. LAVADRANO (points d'eau)
CREATE TABLE lavadrano (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    idtoerana INT REFERENCES toerana(id)
);

-- 6. ETUDE_PHASE_GLOBALE
CREATE TABLE etude_phase_globale (
    id SERIAL PRIMARY KEY,
    idtoerana INT REFERENCES toerana(id),
    identreprise INT REFERENCES entreprise(id),
    idstatut_etude INT REFERENCES statut_etude(id)
);

-- 6b. DEVIS (plusieurs devis possibles par étude)
CREATE TABLE devis (
    id SERIAL PRIMARY KEY,
    id_etude_phase_globale INT REFERENCES etude_phase_globale(id),
    montant NUMERIC(10,2)
);

-- 7. ETUDE_PHASE1 (visites terrain, plusieurs par étude)
CREATE TABLE etude_phase1 (
    id SERIAL PRIMARY KEY,
    idetude_phase_globale INT REFERENCES etude_phase_globale(id),
    date_visite DATE,
    observations TEXT,
    idstatut_etude INT REFERENCES statut_etude(id)
);

-- 8. ETUDE_PHASE2 (analyses géophysiques, plusieurs par étude)
CREATE TABLE etude_phase2 (
    id SERIAL PRIMARY KEY,
    idetude_phase_globale INT REFERENCES etude_phase_globale(id),
    date_analyse DATE,
    analyse_sous_sol TEXT,
    profondeur VARCHAR(50),
    idstatut_etude INT REFERENCES statut_etude(id)
);

-- 9. HISTORIQUE DES ACTIONS
CREATE TABLE historique_etude (
    id SERIAL PRIMARY KEY,
    idetude_phase_globale INT REFERENCES etude_phase_globale(id),
    idetude_phase1 INT REFERENCES etude_phase1(id),
    idetude_phase2 INT REFERENCES etude_phase2(id),
    date_action DATE,
    idstatut_etude INT REFERENCES statut_etude(id),
    commentaire TEXT
);

-- 10. REALISATION_CREUSEMENT (1 par étude)
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

-- 11. REALISATION_EAU (1 par étude)
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

-- 12. REALISATION_TEST_SANITAIRE
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

-- 13. REALISATION_POMPAGE
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

-- 14. REALISATION_EQUIPEMENT
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

-- 15. HISTORIQUE_REALISATION
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


-- CLIENT
INSERT INTO client (nom) VALUES ('Client A');

-- ENTREPRISE
INSERT INTO entreprise (nom, contact) VALUES ('Entreprise A', '0340000000');

-- STATUT
INSERT INTO statut_etude (nom) VALUES ('En attente'), ('Accepté'), ('Refusé'), ('Terminé');

-- TERRAIN
INSERT INTO toerana (nom, adresse, idclient) VALUES ('Terrain A', 'Antananarivo', 1);

-- POINT D'EAU
INSERT INTO lavadrano (nom, idtoerana) VALUES ('Point Eau A', 1);

-- ETUDE GLOBALE
INSERT INTO etude_phase_globale (idtoerana, identreprise, idstatut_etude) VALUES (1, 1, 1);

-- DEVIS
INSERT INTO devis (id_etude_phase_globale, montant) VALUES (1, 1000.00);

-- PHASE 1 (visite)
INSERT INTO etude_phase1 (idetude_phase_globale, date_visite, observations, idstatut_etude)
VALUES (1, '2026-03-18', 'Visite OK', 2);

-- PHASE 2 (analyse géophysique)
INSERT INTO etude_phase2 (idetude_phase_globale, date_analyse, analyse_sous_sol, profondeur, idstatut_etude)
VALUES (1, '2026-03-20', 'Sol sableux', '20m', 2);

-- HISTORIQUE ETUDE
INSERT INTO historique_etude (idetude_phase_globale, idetude_phase1, date_action, idstatut_etude, commentaire)
VALUES (1, 1, '2026-03-18', 3, 'Acceptée par client');

INSERT INTO historique_etude (idetude_phase_globale, idetude_phase2, date_action, idstatut_etude, commentaire)
VALUES (1, 1, '2026-03-20', 3, 'Acceptée par client');

-- REALISATION CREUSEMENT
INSERT INTO realisation_creusement (idetude_phase_globale, date_debut_creusement, profondeur_atteinte, idstatut_etude, observations)
VALUES (1, '2026-04-01', '20m', 2, 'OK');

-- REALISATION EAU
INSERT INTO realisation_eau (idetude_phase_globale, date_decouverte_eau, debit_estime, idstatut_etude, observations)
VALUES (1, '2026-04-02', '1 m3/h', 2, 'Eau trouvée');

-- REALISATION TEST SANITAIRE
INSERT INTO realisation_test_sanitaire (idetude_phase_globale, date_prelevement, laboratoire, conformite, idstatut_etude)
VALUES (1, '2026-04-03', 'Lab A', 'Conforme', 2);

-- REALISATION POMPAGE
INSERT INTO realisation_pompage (idetude_phase_globale, date_test, debit_pompage, idstatut_etude)
VALUES (1, '2026-04-04', '1 m3/h', 2);

-- REALISATION EQUIPEMENT
INSERT INTO realisation_equipement (idetude_phase_globale, date_installation, type_pompe, idstatut_etude)
VALUES (1, '2026-04-05', 'Pompe simple', 2);

-- HISTORIQUE REALISATION
INSERT INTO historique_realisation (id_realisation_creusement, action, date_action, idstatut_etude, commentaire)
VALUES (1, 'Fin creusement', NOW(), 1, 'Terminé');