
CREATE TABLE IF NOT EXISTS 'nests' ( 'id' int(11) NOT NULL AUTO_INCREMENT, 'date_discovery' date NOT NULL, 'predicted_delivery' date NOT NULL, 'actual_delivery' date NOT NULL, 'nest_lat' float NOT NULL, 'nest_lon' float NOT NULL, PRIMARY KEY ('id') ) 

CREATE TABLE IF NOT EXISTS 'observations' ( 'id' int(100) NOT NULL AUTO_INCREMENT, 'nest_id' int(11) NOT NULL, 'date' date NOT NULL, 'temperature' float NOT NULL, 'condition' text NOT NULL, PRIMARY KEY ('id') )

CREATE TABLE IF NOT EXISTS 'sitings' ( 'id' int(11) NOT NULL AUTO_INCREMENT, 'turtle_id' int(11) NOT NULL, 'condition' text NOT NULL, 'is_injured' tinyint(1) NOT NULL DEFAULT '0', 'sited_on' date NOT NULL, 'lat' float NOT NULL, 'lon' float NOT NULL, PRIMARY KEY ('id') )


CREATE TABLE IF NOT EXISTS 'species' ( 'id' int(11) NOT NULL AUTO_INCREMENT, 'name' varchar(100) NOT NULL, 'description' text NOT NULL, PRIMARY KEY ('id'), UNIQUE KEY 'name' ('name') )


CREATE TABLE IF NOT EXISTS 'turtles' ( 'id' int(11) NOT NULL, 'dob' date NOT NULL, 'gender' enum('M','F') NOT NULL DEFAULT 'F', 'species_id' int(11) NOT NULL, 'birth_lat' float NOT NULL, 'birth_lon' float NOT NULL, 'deceased' tinyint(1) NOT NULL DEFAULT '0', PRIMARY KEY ('id') )
