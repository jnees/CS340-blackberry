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
    ON DELETE SET NULL
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
    ON DELETE CASCADE,
    CONSTRAINT combo_id UNIQUE (sighting_id, whale_id)
);

INSERT INTO Species (name, description)
VALUES 
("Orca", "Black-and-white patterned body."),
("Gray", "Gray patches and white mottling on dark skin."),
("Humpback", "Long pectoral fins and a knobbly head."),
("Minke", "Black to dark gray with a pale chevron on the back behind the head and above the flippers."),
("Pacific White Sided Dolphin", "Dark gray flippers and dorsal fin. Light gray patches on the sides.");

INSERT INTO Organizations (name, type)
VALUES
("Whale Tales", "Non-profit"),
("University of Washington", "Educational"),
("Whale Watchers", "Tourism");

INSERT INTO Whales (name, birthyear, is_female, is_transient, species_id)
VALUES
("Tahlequah", 1998, 1, 0, 1),
("Blackberry", 1991, 0, 0, 1),
("Oreo", 1985, 1, 0, 1),
("Alki", 1999, 1, 0, 1);

INSERT INTO Researchers (first_name, last_name, email, organization_id)
VALUES
("Abner", "Benedicto", "abenedicto1r@washington.edu", 2),
("Adaline", "Elcott", "aelcott0@whaletails", 1),
("Farrah", "Crompton", "fcromptonc@whalewatchers.com", 3),
("Kristel",	"Seaborne", "kseabornek@whaletales.org", 1),
("Deva", "Quiddington",	"dquiddington3@washington.edu",	2);

INSERT INTO Sightings(datetime, latitude, longitude, researcher_id)
VALUES
('2021/3/27 18:19:00', 47.614081, -122.389926, 1),
('2021/9/29 2:45:00', 47.648136, -122.493726, 3),
('2021/4/26 7:19:00', 47.739778, -122.458992, 4),
('2021/3/19 7:39:00', 47.577108, -122.440209, 2),
('2021/4/30 5:04:00', 47.546325, -122.44628, 5);

INSERT INTO Sightings_Whales(sighting_id, whale_id)
VALUES
(1, 1),
(1, 2),
(2, 4),
(3,	1),
(3,	2),
(3,	3),
(4,	3),
(4,	4),
(5,	1),
(5,	3);

SET FOREIGN_KEY_CHECKS=1;