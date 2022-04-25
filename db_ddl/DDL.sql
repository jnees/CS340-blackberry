SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS Species;
DROP TABLE IF EXISTS Whales;
DROP TABLE IF EXISTS Sightings_Whales;
DROP TABLE IF EXISTS Researchers;
DROP TABLE IF EXISTS Sightings;
DROP TABLE IF EXISTS Organizations;

CREATE TABLE Species(
	species_id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    description TEXT,
    PRIMARY KEY(species_id)
);

CREATE TABLE Whales (
	whale_id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    birthyear YEAR,
    is_female TINYINT(1),
    is_transient TINYINT(1),
    species_id INT(11), 
	PRIMARY KEY (whale_id),
    FOREIGN KEY (species_id) REFERENCES Species(species_id)
);

CREATE TABLE Organizations (
	organization_id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    type VARCHAR(45) NOT NULL,
    PRIMARY KEY (organization_id)
);

CREATE TABLE Researchers (
	researcher_id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    email VARCHAR(254) NOT NULL,
    organization_id int(11),
    PRIMARY KEY (researcher_id),
    FOREIGN KEY (organization_id) REFERENCES Organizations(organization_id)
    ON DELETE SET NULL
);

CREATE TABLE Sightings (
	sighting_id INT(11) NOT NULL AUTO_INCREMENT,
    datetime DATETIME NOT NULL,
    latitude DECIMAL(8, 6) NOT NULL,
    longitude DECIMAL(9, 6) NOT NULL,
    researcher_id INT(11),
    PRIMARY KEY (sighting_id),
    FOREIGN KEY (researcher_id) REFERENCES Researchers(researcher_id)
    ON DELETE SET NULL
);

CREATE TABLE Sightings_Whales (
	sighting_whale_id INT(11) NOT NULL AUTO_INCREMENT,
    sighting_id INT(11),
    whale_id INT(11),
    PRIMARY KEY(sighting_whale_id),
    FOREIGN KEY (sighting_id) REFERENCES Sightings(sighting_id)
    ON DELETE CASCADE,
    FOREIGN KEY (whale_id) REFERENCES Whales(whale_id)
    ON DELETE CASCADE
);

SET FOREIGN_KEY_CHECKS=1;