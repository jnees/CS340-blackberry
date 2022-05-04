-- SELECT RECORDS --

-- Query to retrieve all Species records (/species) 
SELECT * FROM Species;

-- Query to retrieve all Organizations records (/organizations) 
SELECT * FROM Organizations;

-- Query to retrieve all Whale records (/whales) 
SELECT * FROM Whales;

-- Query to retrieve all Species records (/researchers) 
SELECT * FROM Researchers;

-- Query to retrieve all Sighting records (/sightings) 
SELECT * FROM Sightings;

-- Query to retrieve Sightings records corresponding to applied filter of whale_id (/sightings) - ":" denotes data that will be passed from the web form via the backend
SELECT * FROM Sightings WHERE sighting_id IN(SELECT sighting_id FROM Sightings_Whales WHERE whale_id = :whale_id);


-- CREATE NEW RECORDS --

-- Query to add new Species (/species/insert) - ":" denotes data that will be passed from the web form via the backend
INSERT INTO Species (name, description)
VALUES 
(:name, :description);

-- Query to add new Organization (/organizations/insert) - ":" denotes data that will be passed from the web form via the backend
INSERT INTO Organizations (name, type)
VALUES
(:name, :type);

-- Query to add new Whale (/whales/insert) - ":" denotes data that will be passed from the web form via the backend
INSERT INTO Whales (name, birthyear, is_female, is_transient, species_id)
VALUES
(:name, :birthyear, :is_female, :is_transient, :species_id);

-- Query to add new Researcher (/researchers/insert) - ":" denotes data that will be passed from the web form via the backend 
-- Researcher:Organization is a nullable relationship 
INSERT INTO Researchers (first_name, last_name, email, organization_id)
VALUES
(:first_name, :last_name, :email, :organization_id);

-- Query to add new Sighting (/sightings/insert) - ":" denotes data that will be passed from the web form via the backend 
-- Sightings:Whales is M:M relationship maintained in the Sightings_Whales intersection table. Each whale_id entered in the form will have the second Insert statement below executed upon it
INSERT INTO Sightings(datetime, latitude, longitude, researcher_id)
VALUES
(:datetime, :latitude, :longitude, :researcher_id);

INSERT INTO Sightings_Whales(sighting_id, whale_id)
VALUES
((SELECT sighting_id FROM Sightings WHERE datetime = :datetime AND latitude = :latitude AND longitude = :longitude AND researcher_id = :researcher_id), :whale_id)


-- DELETE RECORDS --

-- Query to delete Species record (/species/delete) - ":" denotes data that will be passed from the web form via the backend
DELETE FROM Species WHERE species_id = :species_id;

-- Query to delete Organization record (/organizations/delete) - ":" denotes data that will be passed from the web form via the backend
DELETE FROM Organizations WHERE organization_id = :organization_id;

-- Query to delete Whale record (/whales/delete) - ":" denotes data that will be passed from the web form via the backend
DELETE FROM Whales WHERE whale_id = :whale_id;

-- Query to delete Researcher record (/researchers/delete) - ":" denotes data that will be passed from the web form via the backend
DELETE FROM Researchers WHERE researcher_id = :researcher_id;

-- Query to delete Sighting record (/organizations/delete) - ":" denotes data that will be passed from the web form via the backend
-- Delete is set to cascade to delete on the Sightings_Whales intersection table
DELETE FROM Sightings WHERE sighting_id = :sighting_id;


-- UPDATE RECORDS --

-- Query to update Species record (/species/update) - ":" denotes data that will be passed from the web form via the backend
UPDATE Species SET name = :name, description = :description WHERE species_id = :species_id;

-- Query to update Organization record (/organizations/update) - ":" denotes data that will be passed from the web form via the backend
UPDATE Organizations SET name = :name, type = :type WHERE organization_id = :organization_id;

-- Query to update Whale record (/whales/update) - ":" denotes data that will be passed from the web form via the backend
UPDATE Whales SET name = :name, birthyear = :birthyear, is_female = :is_female, is_transient = :is_transient, species_id = :species_id WHERE whale_id = :whale_id;

-- Query to update Researcher record (/researcher/update) - ":" denotes data that will be passed from the web form via the backend
UPDATE Researchers SET first_name = :first_name, last_name = :last_name, email = :email, organization_id = :organization_id WHERE researcher_id = :researcher_id;

-- Query to update Sighting record (/sightings/update) - ":" denotes data that will be passed from the web form via the backend
-- Sightings:Whales is M:M relationship maintained in the Sightings_Whales intersection table. The backend will store the list of whale_ids entered in the form in memory.
-- The delete statement below will catch and remove any Sightings_Whales records of whale_ids removed from the record and the insert will individually add any new additions
-- Sightings_Whales table has a constraint that will prevent insertion of a record with a duplicate sighting_id/whale_id combination 
UPDATE Sightings SET datetime = :datetime, latitude = :latitude, longitude = :longitude, researcher_id = :researcher_id WHERE sighting_id = :sighting_id;

DELETE FROM Sightings_Whales WHERE sighting_id = :sighting_id AND whale_id NOT IN(:whale_ids);

INSERT INTO Sightings_Whales (sighting_id, whale_id) VALUES (:sighting_id, :whale_id);

