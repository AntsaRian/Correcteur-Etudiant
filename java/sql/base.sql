CREATE DATABASE correcteur_etudiant;
\c correcteur_etudiant;

CREATE TABLE Matiere (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    coeff INT
);

CREATE TABLE Etudiant (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE Correcteur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE Operateur (
    id SERIAL PRIMARY KEY,
    operateur VARCHAR(5) NOT NULL
);

CREATE TABLE Resolution (
    id SERIAL PRIMARY KEY,
    resolution VARCHAR(50) NOT NULL
);

CREATE TABLE Parametre (
    id SERIAL PRIMARY KEY,
    id_matiere INT REFERENCES Matiere(id) NOT NULL,
    diff DECIMAL(10,2) NOT NULL,
    id_operateur INT REFERENCES Operateur(id) NOT NULL,
    id_resolution INT REFERENCES Resolution(id) NOT NULL
);

CREATE TABLE Note (
    id SERIAL PRIMARY KEY,
    id_matiere INT REFERENCES Matiere(id) NOT NULL,
    note DECIMAL(10,2) NOT NULL,
    id_correcteur INT REFERENCES Correcteur(id) NOT NULL,
    id_etudiant INT REFERENCES Etudiant(id) NOT NULL
);


-- Donnees
-- Insertion des matieres
INSERT INTO Matiere (nom, coeff) VALUES
('Maths', 4),
('Francais', 3),
('Histoire Geo', 2),
('Anglais', 2),
('SVT', 3);

-- Insertion des etudiants
INSERT INTO Etudiant (nom) VALUES
('Rakoto Jean'),
('Rabe Paul'),
('Randria Marie'),
('Rasoa Lala'),
('Ralainirina Tiana');

-- Insertion des correcteurs
INSERT INTO Correcteur (nom) VALUES
('Randria Pierre'),
('Rakotondrabe Paul'),
('Rasoloarison Jean'),
('Andriambololona Marc'),
('Razafindrakoto Sophie');

-- Insertion des operateurs (corrige)
INSERT INTO Operateur (operateur) VALUES
('<'), ('>'), ('<='), ('>='), ('==');

-- Insertion des resolutions (corrige)
INSERT INTO Resolution (resolution) VALUES
('plus petit'), ('plus grand'), ('moyenne');

-- Insertion des parametres (corrige pour correspondre a la logique)
INSERT INTO Parametre (id_matiere, diff, id_operateur, id_resolution) VALUES
(1, 3.0, 2, 2),  -- Maths: diff=3.0, operateur >, resolution plus grand
(2, 2.0, 2, 1),  -- Francais: diff=2.0, operateur <, resolution plus petit
(3, 4.0, 2, 2),  -- Histoire Geo: diff=4.0, operateur >, resolution plus grand
(4, 1.5, 4, 1),  -- Anglais: diff=1.5, operateur <=, resolution plus petit
(5, 2.5, 5, 3);  -- SVT: diff=2.5, operateur ==, resolution moyenne

-- Insertion des notes adaptees pour que les calculs de differences soient coherents
INSERT INTO Note (id_matiere, note, id_correcteur, id_etudiant) VALUES
-- Etudiant 1: Rakoto Jean
(1, 12.0, 1, 1),  -- Maths par correcteur 1
(1, 14.0, 2, 1),  -- Maths par correcteur 2
(1, 10.0, 3, 1),  -- Maths par correcteur 3 (difference: |14-12|=2, |14-10|=4, |12-10|=2, somme=8 > 3.0 -> prend 14)
(2, 15.0, 1, 1),  -- Francais par correcteur 1
(2, 12.0, 2, 1),  -- Francais par correcteur 2 
(2, 14.0, 3, 1),  -- Francais par correcteur 3 (difference: somme=6 < 2.0? Non, 6>2.0, donc pour operateur <, condition fausse -> moyenne)
(3, 10.0, 1, 1),  -- Histoire Geo par correcteur 1
(3, 14.0, 2, 1),  -- Histoire Geo par correcteur 2
(3, 12.0, 3, 1),  -- Histoire Geo par correcteur 3 (difference: |14-10|=4, |14-12|=2, |12-10|=2, somme=8 > 4.0 -> prend 14)
(4, 13.0, 1, 1),  -- Anglais par correcteur 1
(4, 15.0, 2, 1),  -- Anglais par correcteur 2 (difference: |15-13|=2, somme=2 <= 1.5? Non, 2>1.5 -> condition fausse -> moyenne)
(5, 14.0, 1, 1),  -- SVT par correcteur 1
(5, 16.0, 2, 1),  -- SVT par correcteur 2
(5, 12.0, 3, 1),  -- SVT par correcteur 3 (difference: |16-14|=2, |16-12|=4, |14-12|=2, somme=8 == 2.5? Non -> condition fausse -> moyenne)

-- Etudiant 2: Rabe Paul
(1, 8.0, 1, 2),   -- Maths par correcteur 1
(1, 10.0, 2, 2),  -- Maths par correcteur 2
(1, 9.0, 3, 2),   -- Maths par correcteur 3 (difference: somme=4 > 3.0 -> prend 10)
(2, 11.0, 1, 2),  -- Francais par correcteur 1
(2, 13.0, 2, 2),  -- Francais par correcteur 2
(2, 12.0, 3, 2),  -- Francais par correcteur 3 (difference: somme=4 < 2.0? Non -> moyenne)
(3, 13.0, 1, 2),  -- Histoire Geo par correcteur 1
(3, 15.0, 2, 2),  -- Histoire Geo par correcteur 2
(3, 11.0, 3, 2),  -- Histoire Geo par correcteur 3 (difference: somme=8 > 4.0 -> prend 15)
(4, 9.0, 1, 2),   -- Anglais par correcteur 1
(4, 11.0, 2, 2),  -- Anglais par correcteur 2 (difference: |11-9|=2, somme=2 <= 1.5? Non -> moyenne)
(5, 16.0, 1, 2),  -- SVT par correcteur 1
(5, 14.0, 2, 2),  -- SVT par correcteur 2
(5, 15.0, 3, 2),  -- SVT par correcteur 3 (difference: somme=4 == 2.5? Non -> moyenne)

-- Etudiant 3: Randria Marie
(1, 17.0, 1, 3),  -- Maths par correcteur 1
(1, 18.0, 2, 3),  -- Maths par correcteur 2
(1, 16.0, 3, 3),  -- Maths par correcteur 3 (difference: somme=4 > 3.0 -> prend 18)
(2, 14.0, 1, 3),  -- Francais par correcteur 1
(2, 16.0, 2, 3),  -- Francais par correcteur 2
(2, 15.0, 3, 3),  -- Francais par correcteur 3 (difference: somme=4 < 2.0? Non -> moyenne)
(3, 15.0, 1, 3),  -- Histoire Geo par correcteur 1
(3, 17.0, 2, 3),  -- Histoire Geo par correcteur 2
(3, 16.0, 3, 3),  -- Histoire Geo par correcteur 3 (difference: somme=4 > 4.0? Non, 4=4.0 -> condition fausse car > et non >= -> moyenne)
(4, 12.0, 1, 3),  -- Anglais par correcteur 1
(4, 14.0, 2, 3),  -- Anglais par correcteur 2 (difference: |14-12|=2, somme=2 <= 1.5? Non -> moyenne)
(5, 13.0, 1, 3),  -- SVT par correcteur 1
(5, 15.0, 2, 3),  -- SVT par correcteur 2
(5, 14.0, 3, 3),  -- SVT par correcteur 3 (difference: somme=4 == 2.5? Non -> moyenne)

-- Etudiant 4: Rasoa Lala
(1, 10.0, 1, 4),  -- Maths par correcteur 1
(1, 12.0, 2, 4),  -- Maths par correcteur 2
(1, 11.0, 3, 4),  -- Maths par correcteur 3 (difference: somme=4 > 3.0 -> prend 12)
(2, 9.0, 1, 4),   -- Francais par correcteur 1
(2, 11.0, 2, 4),  -- Francais par correcteur 2
(2, 10.0, 3, 4),  -- Francais par correcteur 3 (difference: somme=4 < 2.0? Non -> moyenne)
(3, 14.0, 1, 4),  -- Histoire Geo par correcteur 1
(3, 12.0, 2, 4),  -- Histoire Geo par correcteur 2
(3, 13.0, 3, 4),  -- Histoire Geo par correcteur 3 (difference: somme=4 > 4.0? Non -> moyenne)
(4, 8.0, 1, 4),   -- Anglais par correcteur 1
(4, 10.0, 2, 4),  -- Anglais par correcteur 2 (difference: |10-8|=2, somme=2 <= 1.5? Non -> moyenne)
(5, 8.0, 1, 4),   -- SVT par correcteur 1
(5, 10.0, 2, 4),  -- SVT par correcteur 2
(5, 9.0, 3, 4),   -- SVT par correcteur 3 (difference: somme=4 == 2.5? Non -> moyenne)

-- Etudiant 5: Ralainirina Tiana
(1, 15.0, 1, 5),  -- Maths par correcteur 1
(1, 17.0, 2, 5),  -- Maths par correcteur 2
(1, 16.0, 3, 5),  -- Maths par correcteur 3 (difference: somme=4 > 3.0 -> prend 17)
(2, 16.0, 1, 5),  -- Francais par correcteur 1
(2, 14.0, 2, 5),  -- Francais par correcteur 2
(2, 15.0, 3, 5),  -- Francais par correcteur 3 (difference: somme=4 < 2.0? Non -> moyenne)
(3, 12.0, 1, 5),  -- Histoire Geo par correcteur 1
(3, 14.0, 2, 5),  -- Histoire Geo par correcteur 2
(3, 13.0, 3, 5),  -- Histoire Geo par correcteur 3 (difference: somme=4 > 4.0? Non -> moyenne)
(4, 11.0, 1, 5),  -- Anglais par correcteur 1
(4, 13.0, 2, 5),  -- Anglais par correcteur 2 (difference: |13-11|=2, somme=2 <= 1.5? Non -> moyenne)
(5, 17.0, 1, 5),  -- SVT par correcteur 1
(5, 15.0, 2, 5),  -- SVT par correcteur 2
(5, 16.0, 3, 5);  -- SVT par correcteur 3 (difference: somme=4 == 2.5? Non -> moyenne)


-- REINITIALISATION
TRUNCATE TABLE Note RESTART IDENTITY CASCADE;
TRUNCATE TABLE Parametre RESTART IDENTITY CASCADE;
TRUNCATE TABLE Resolution RESTART IDENTITY CASCADE;
TRUNCATE TABLE Operateur RESTART IDENTITY CASCADE;
TRUNCATE TABLE Correcteur RESTART IDENTITY CASCADE;
TRUNCATE TABLE Etudiant RESTART IDENTITY CASCADE;
TRUNCATE TABLE Matiere RESTART IDENTITY CASCADE;