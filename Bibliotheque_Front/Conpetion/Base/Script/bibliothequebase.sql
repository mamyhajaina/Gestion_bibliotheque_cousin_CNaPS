create table DRH.livres(
    idLivre NUMBER,
    identifiant VARCHAR2(10 BYTE),
    titre VARCHAR2(255 BYTE),
    sousTitre VARCHAR2(255 byte),
    nombredePages NUMBER,
    volume VARCHAR2(255 BYTE),
    dateEdition DATE,
    anneeEdition NUMBER,
    lieuEdition VARCHAR2(255 BYTE),
    numeroEdition VARCHAR2(255 BYTE),
    resumee VARCHAR2(10000 BYTE),
    prix NUMBER
);

create table DRH.auteur(
    idAuteur NUMBER,
    nom VARCHAR2(50 BYTE)
);

create table DRH.mouvementlivre(
    idMouvement NUMBER,
    quantite NUMBER,
    entree CHAR(1 BYTE),
    sortie CHAR(2 BYTE),
    numeroCommande VARCHAR2(100 BYTE),
    daty DATE
);

create table DRH.livreEmprunte(
    idLivreEmprunte NUMBER
);

create table DRH.Stock(
    idStock NUMBER,
    quantite int,
    quantiteTemp int
);

create table DRH.commandelivre(
    idCommandelivre NUMBER,
    dateCommandelivre DATE,
    datDebut DATE,
    dateFin DATE,
    matricule VARCHAR2(20 BYTE),
    dateFinRenouvellement DATE
);

create table DRH.etat(
    idEtat NUMBER,
    libelle VARCHAR2(100 BYTE)
);  


ALTER TABLE DRH.livres ADD PRIMARY KEY (idLivre);
ALTER TABLE DRH.auteur ADD PRIMARY KEY (idAuteur);
ALTER TABLE DRH.mouvementlivre ADD PRIMARY KEY (idMouvement);
ALTER TABLE DRH.livreEmprunte ADD PRIMARY KEY (idLivreEmprunte);
ALTER TABLE DRH.Stock ADD PRIMARY KEY (idStock);
ALTER TABLE DRH.commandelivre ADD PRIMARY KEY (idCommandelivre);
ALTER TABLE DRH.etat ADD PRIMARY KEY (idEtat);