CREATE DATABASE lavadrano;
\c lavadrano;

CREATE TABLE Entreprise (
    id      SERIAL PRIMARY KEY,
    nom     VARCHAR(50) NOT NULL,
    contact VARCHAR(60)
);

CREATE TABLE Client (
    id      SERIAL PRIMARY KEY,
    nom     VARCHAR(50) NOT NULL,
    contact VARCHAR(60)
);

CREATE TABLE Type_sol (
    id  SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE Toerana (
    id          SERIAL PRIMARY KEY,
    nom         VARCHAR(60) NOT NULL,
    id_type_sol INT REFERENCES Type_sol(id) NOT NULL
);

CREATE TABLE Lavadrano (
    id            SERIAL PRIMARY KEY,
    ref           VARCHAR(30) NOT NULL,
    id_toerana    INT REFERENCES Toerana(id)    NOT NULL,
    id_client     INT REFERENCES Client(id)     NOT NULL,
    id_entreprise INT REFERENCES Entreprise(id) NOT NULL,
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Distance (
    id             SERIAL PRIMARY KEY,
    id_source      INT REFERENCES Toerana(id) NOT NULL,
    id_destination INT REFERENCES Toerana(id) NOT NULL,
    distance_km    DECIMAL(10,2) NOT NULL
);

CREATE TABLE Operateur (
    id    SERIAL PRIMARY KEY,
    signe CHAR(5) NOT NULL
);

CREATE TABLE Etape (
    id    SERIAL PRIMARY KEY,
    nom   VARCHAR(100) NOT NULL,
    ordre INT NOT NULL
);

CREATE TABLE Technicien (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(70) NOT NULL
);

CREATE TABLE Devis_technicien (
    id SERIAL PRIMARY KEY,
    id_technicien INt REFERENCES Technicien(id) NOT NULL,
    cout DECIMAL(10,2) NOT NULL
);

CREATE TABLE Devis_transport (
    id           SERIAL PRIMARY KEY,
    id_etape     INT REFERENCES Etape(id)     NOT NULL,
    id_distance  INT REFERENCES Distance(id)  NOT NULL,
    id_operateur INT REFERENCES Operateur(id) NOT NULL,
    cout         DECIMAL(12,2) NOT NULL
);

CREATE TABLE Devis_forage (
    id          SERIAL PRIMARY KEY,
    id_etape    INT REFERENCES Etape(id)    NOT NULL,
    id_type_sol INT REFERENCES Type_sol(id) NOT NULL,
    cout_metre  DECIMAL(10,2) NOT NULL
);

CREATE TABLE Type_tube (
    id  SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE Devis_tube (
    id           SERIAL PRIMARY KEY,
    id_etape     INT REFERENCES Etape(id)     NOT NULL,
    id_type_tube INT REFERENCES Type_tube(id) NOT NULL,
    cout_metre   DECIMAL(10,2) NOT NULL
);

CREATE TABLE Devis_test_sanitaire (
    id       SERIAL PRIMARY KEY,
    id_etape INT REFERENCES Etape(id) NOT NULL,
    nom      VARCHAR(100) NOT NULL,
    cout     DECIMAL(12,2) NOT NULL
);

CREATE TABLE Total_devis_lavadrano (
    id           SERIAL PRIMARY KEY,
    id_lavadrano INT REFERENCES Lavadrano(id) NOT NULL,
    total        DECIMAL(12,2) NOT NULL DEFAULT 0
);

CREATE TABLE Statut (
    id  SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE Historique_forage (
    id           SERIAL PRIMARY KEY,
    id_lavadrano INT REFERENCES Lavadrano(id) NOT NULL,
    id_etape     INT REFERENCES Etape(id)     NOT NULL,
    id_statut    INT REFERENCES Statut(id)    NOT NULL,
    daty         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);  