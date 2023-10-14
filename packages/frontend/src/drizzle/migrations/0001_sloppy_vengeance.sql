CREATE TABLE `branch` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`restaurant_id` int NOT NULL,
	CONSTRAINT `branch_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menu` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`restaurant_id` int NOT NULL,
	`create_date` int NOT NULL,
	`update_date` int NOT NULL,
	CONSTRAINT `menu_id` PRIMARY KEY(`id`),
	CONSTRAINT `menu_idx` UNIQUE(`restaurant_id`)
);
--> statement-breakpoint
CREATE TABLE `menu_item` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`price` double NOT NULL,
	`menu_id` int NOT NULL,
	CONSTRAINT `menu_item_id` PRIMARY KEY(`id`),
	CONSTRAINT `menu_item_idx` UNIQUE(`menu_id`)
);
--> statement-breakpoint
CREATE TABLE `restaurant` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `restaurant_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `discount` ADD `item_idx` int NOT NULL;--> statement-breakpoint
ALTER TABLE `discount` ADD `branch_idx` int NOT NULL;--> statement-breakpoint
CREATE INDEX `branch_idx` ON `branch` (`restaurant_id`);--> statement-breakpoint
ALTER TABLE `discount` ADD CONSTRAINT `discount_idx` UNIQUE(`item_idx`);--> statement-breakpoint
ALTER TABLE `discount` ADD CONSTRAINT `discount_idx2` UNIQUE(`branch_idx`);