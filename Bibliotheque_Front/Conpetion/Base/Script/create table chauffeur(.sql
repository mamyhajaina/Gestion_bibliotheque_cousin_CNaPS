create table chauffeur(
    idChauffeur INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    email VARCHAR(50),
    mdp VARCHAR(255)
);


drop table if exists administrateur;
create table administrateur(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
    mdp VARCHAR(255)
);


drop table if exists typeVehicule;
create table typeVehicule(
    idType INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(10)
);


drop table if exists modelVehicule;
create table modelVehicule(
    idModel INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(10)
);


drop table if exists trajet;
create table trajet(
    idTrajet INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    debut VARCHAR(50),
    fin VARCHAR(50),
    kilometrage INT
);


drop table if exists vehicule;
create table vehicule(
    idVehicule INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    numero INT NOT NULL,
    idModel INT NOT NULL,
    idType INT NOT NULL,
    disponibilite boolean,
    consommation INT,
    compteur INT,
    FOREIGN KEY (idModel) REFERENCES modelVehicule(idModel),
    FOREIGN KEY (idType) REFERENCES typeVehicule(idType)
);


drop table if exists vehicule_Trajet_Chauffeur;
create table vehicule_Trajet_Chauffeur(
    idTout INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idVehicule INT NOT NULL,
    idTrajet INT NOT NULL,
    idChauffeur INT NOT NULL,
    FOREIGN KEY (idVehicule) REFERENCES Vehicule(idVehicule),
    FOREIGN KEY (idTrajet) REFERENCES trajet(idTrajet),
    FOREIGN KEY (idChauffeur) REFERENCES chauffeur(idChauffeur)
);


drop table if exists entretien;
create table entretien(
    idEntretien INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50),
    valeur boolean
);


drop table if exists statistique;
create table statistique(
    idVehicule INT,
    consommation INT,
    trajet int
);


drop table if exists carnet;
create table carnet(
    idCarnet INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idTout INT NOT NULL,
    FOREIGN KEY (idTout) REFERENCES vehicule_Trajet_Chauffeur(idTout)
);