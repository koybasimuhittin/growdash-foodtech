CREATE TABLE `discount` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`percentage` double NOT NULL,
	`start_date` int NOT NULL,
	`end_date` int NOT NULL,
	CONSTRAINT `discount_id` PRIMARY KEY(`id`)
);
