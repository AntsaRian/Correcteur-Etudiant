CREATE DATABASE lavadrano;
\c lavadrano;

CREATE TABLE Entreprise (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    contact VARCHAR(60)
);

CREATE TABLE Client (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    contact VARCHAR(60)
);

CREATE TABLE Toerana (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(60) NOT NULL
);

CREATE TABLE Type_sol (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE Lavadrano (
    id SERIAL PRIMARY KEY,
    ref VARCHAR(30) NOT NULL,
    id_client INT REFERENCES Client(id) NOT NULL,
    id_entreprise INT REFERENCES Entreprise(id) NOT NULL,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Faritra (
    id SERIAL PRIMARY KEY,
    descriptions TEXT,
    id_toerana INT REFERENCES Toerana(id) NOT NULL,
    id_lavadrano INT REFERENCES Lavadrano(id) NOT NULL,
    id_type_sol INT REFERENCES Type_sol(id) NOT NULL,
    surface_m2 DECIMAL(10,2) NOT NULL,
    profondeur_eau DECIMAL(10,2) NOT NULL,
    quantite_eau DECIMAL(10,2) NOT NULL
);

CREATE TABLE Type_devis (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE Etape (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(60) NOT NULL,
    id_type_devis INT REFERENCES Type_devis(id) NOT NULL
);

CREATE TABLE Devis (
    id SERIAL PRIMARY KEY,
    id_etape INT REFERENCES Etape(id) NOT NULL,
    id_type_sol INT REFERENCES Type_sol(id),
    cout_metre DECIMAL(10,2),
    cout_general DECIMAL(10,2)
);

CREATE TABLE Total_devis_lavadrano (
    id SERIAL PRIMARY KEY,
    id_lavadrano INT REFERENCES Lavadrano(id) NOT NULL,
    total DECIMAL(10,2)
);

CREATE TABLE Statut (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE Historique_forage (
    id SERIAL PRIMARY KEY,
    id_lavadrano INT REFERENCES Lavadrano(id) NOT NULL,
    id_etape INT REFERENCES Etape(id) NOT NULL,
    id_statut INT REFERENCES Statut(id) NOT NULL,
    daty TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);