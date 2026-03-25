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

-- REINITIALISATION
TRUNCATE TABLE Demande_statut RESTART IDENTITY CASCADE;
TRUNCATE TABLE Statuts RESTART IDENTITY CASCADE;
TRUNCATE TABLE Details_devis RESTART IDENTITY CASCADE;
TRUNCATE TABLE Devis RESTART IDENTITY CASCADE;
TRUNCATE TABLE Type_devis RESTART IDENTITY CASCADE;
TRUNCATE TABLE Demande RESTART IDENTITY CASCADE;
TRUNCATE TABLE Client RESTART IDENTITY CASCADE;