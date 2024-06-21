

CREATE TABLE IF NOT EXISTS `vehicles` (
	`vehicle_id` int AUTO_INCREMENT NOT NULL,
	`number_plate` varchar(15) NOT NULL,
	`make` varchar(50) NOT NULL,
	`model` varchar(50) NOT NULL,
	`year` int NOT NULL,
	`status` varchar(20) NOT NULL,
	`location_id` json NOT NULL,
	PRIMARY KEY (`vehicle_id`)
);

CREATE TABLE IF NOT EXISTS `drivers` (
	`driver_id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`license_number` varchar(20) NOT NULL UNIQUE,
	`license_expiry_date` date NOT NULL,
	`contact_number` varchar(15) NOT NULL,
	`email` varchar(50) NOT NULL UNIQUE,
	PRIMARY KEY (`driver_id`)
);

CREATE TABLE IF NOT EXISTS `assignments` (
	`assignment_id` int AUTO_INCREMENT NOT NULL,
	`vehicle_id` int NOT NULL,
	`driver_id` int NOT NULL,
	`assignment_start_date` date NOT NULL,
	`assignment_end_date` date NOT NULL,
	PRIMARY KEY (`assignment_id`)
);

CREATE TABLE IF NOT EXISTS `maintenance` (
	`maintenance_id` int AUTO_INCREMENT NOT NULL,
	`vehicle_id` int NOT NULL,
	`maintenance_date` date NOT NULL,
	`description` text NOT NULL,
	`cost` decimal(10,2) NOT NULL,
	PRIMARY KEY (`maintenance_id`)
);

CREATE TABLE IF NOT EXISTS `fuel_logs` (
	`fuel_log_id` int AUTO_INCREMENT NOT NULL,
	`vehicle_id` int NOT NULL,
	`date` date NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`cost` decimal(10,2) NOT NULL,
	`odometer_reading` int NOT NULL,
	PRIMARY KEY (`fuel_log_id`)
);

CREATE TABLE IF NOT EXISTS `locations` (
	`location_id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`address` text NOT NULL,
	`city` varchar(50) NOT NULL,
	`state` varchar(50) NOT NULL,
	`zip_code` varchar(10) NOT NULL,
	PRIMARY KEY (`location_id`)
);

CREATE TABLE IF NOT EXISTS `trips` (
	`trip_id` int AUTO_INCREMENT NOT NULL,
	`vehicle_id` int NOT NULL,
	`driver_id` int NOT NULL,
	`start_location_id` int NOT NULL,
	`end_location_id` int NOT NULL,
	`start_time` datetime NOT NULL,
	`end_time` datetime NOT NULL,
	`cargo` text NOT NULL,
	`contract_value` decimal(10,2) NOT NULL,
	PRIMARY KEY (`trip_id`)
);

CREATE TABLE IF NOT EXISTS `incidents` (
	`incident_id` int AUTO_INCREMENT NOT NULL,
	`vehicle_id` int NOT NULL,
	`driver_id` int NOT NULL,
	`date` date NOT NULL,
	`incident_type` varchar(60) NOT NULL,
	`description` text NOT NULL,
	`damage_cost` decimal(10,2) NOT NULL,
	PRIMARY KEY (`incident_id`)
);

ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_fk6` FOREIGN KEY (`location_id`) REFERENCES `locations`(`location_id`);

ALTER TABLE `assignments` ADD CONSTRAINT `assignments_fk1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`vehicle_id`);
ALTER TABLE `maintenance` ADD CONSTRAINT `maintenance_fk1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`vehicle_id`);
ALTER TABLE `fuel_logs` ADD CONSTRAINT `fuel_logs_fk1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`vehicle_id`);

ALTER TABLE `trips` ADD CONSTRAINT `trips_fk1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`vehicle_id`);
ALTER TABLE `incidents` ADD CONSTRAINT `incidents_fk1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`vehicle_id`);