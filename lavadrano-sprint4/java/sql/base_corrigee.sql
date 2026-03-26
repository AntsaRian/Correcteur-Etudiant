CREATE DATABASE lavadrano;
\c lavadrano;

CREATE TABLE Client (
    id      SERIAL PRIMARY KEY,
    nom     VARCHAR(50) NOT NULL,
    contact VARCHAR(60)
);

CREATE TABLE Demande (
    id SERIAL PRIMARY KEY,
    id_client INT REFERENCES Client(id) NOT NULL,
    lieu VARCHAR(50) NOT NULL,
    district VARCHAR(50)
);

CREATE TABLE Type_devis (
    id SERIAL PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

CREATE TABLE Devis (
    id SERIAL PRIMARY KEY,
    id_type_devis INT REFERENCES Type_devis(id) NOT NULL,
    daty DATE DEFAULT CURRENT_DATE,
    id_demande INT REFERENCES Demande(id) NOT NULL
);

CREATE TABLE Details_devis (
    id SERIAL PRIMARY KEY,
    id_devis INT REFERENCES Devis(id) NOT NULL,
    libelle VARCHAR(50) NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    quantite INT NOT NULL
);

CREATE TABLE Statuts (
    id SERIAL PRIMARY KEY,
    libelle VARCHAR(30) NOT NULL
);

CREATE TABLE Demande_statut (
    id SERIAL PRIMARY KEY,
    id_demande INT REFERENCES Demande(id) NOT NULL,
    id_statut INT REFERENCES Statuts(id) NOT NULL,
    daty TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- Donnees base
INSERT INTO Statuts(libelle) VALUES
('Cree'),
('Devis cree'),
('Devis etude accepte'),
('Devis etude refuse'),
('Forage accepte'),
('Forage refuse'),
('Analyse terminee');

INSERT INTO Type_devis (libelle) VALUES
('Etude'),
('Forage');

INSERT INTO Client (nom, contact) VALUES 
('Jean Rakoto', '+261 34 00 123 45'),
('Marie Sarah', 'marie.sarah@email.mg'),
('Entreprise Forage Plus', 'contact@forageplus.com');

INSERT INTO Demande (id_client, lieu, district) VALUES 
(1, 'Analamahitsy', 'Antananarivo Renivohitra'),
(1, 'Ivato', 'Ambohidratrimo'),
(2, 'Talatamaty', 'Ambohidratrimo'),
(2, 'Behoririka', 'Antananarivo Renivohitra'),
(3, 'Ambohimanarina', 'Antananarivo Renivohitra'),
(3, 'Alakamisy Fenoarivo', 'Antananarivo Atsimondrano'),
(1, 'Itanosy', 'Antananarivo Atsimondrano'),
(2, 'Andraharo', 'Antananarivo Renivohitra'),
(3, 'Ankorondrano', 'Antananarivo Renivohitra'),
(1, 'Sabotsy Namehana', 'Antananarivo Avaradrano');

-- On insère un statut "Cree" pour chacune des 10 demandes précédentes
INSERT INTO Demande_statut (id_demande, id_statut, daty) VALUES 
(1, 1, '2026-03-20 08:00:00'),
(2, 1, '2026-03-20 09:15:00'),
(3, 1, '2026-03-21 10:30:00'),
(4, 1, '2026-03-21 11:00:00'),
(5, 1, '2026-03-22 14:00:00'),
(6, 1, '2026-03-22 15:30:00'),
(7, 1, '2026-03-23 08:45:00'),
(8, 1, '2026-03-23 10:00:00'),
(9, 1, '2026-03-24 11:20:00'),
(10, 1, '2026-03-25 09:00:00');

-- REINITIALISATION
TRUNCATE TABLE Demande_statut RESTART IDENTITY CASCADE;
TRUNCATE TABLE Statuts RESTART IDENTITY CASCADE;
TRUNCATE TABLE Details_devis RESTART IDENTITY CASCADE;
TRUNCATE TABLE Devis RESTART IDENTITY CASCADE;
TRUNCATE TABLE Type_devis RESTART IDENTITY CASCADE;
TRUNCATE TABLE Demande RESTART IDENTITY CASCADE;
TRUNCATE TABLE Client RESTART IDENTITY CASCADE;