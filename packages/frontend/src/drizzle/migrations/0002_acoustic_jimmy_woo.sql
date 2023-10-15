ALTER TABLE `discount` DROP CONSTRAINT `discount_idx2`;--> statement-breakpoint
ALTER TABLE `menu` MODIFY COLUMN `create_date` date NOT NULL;--> statement-breakpoint
ALTER TABLE `menu` MODIFY COLUMN `update_date` date NOT NULL;--> statement-breakpoint
ALTER TABLE `branch` ADD `slug` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `restaurant` ADD `slug` varchar(255) NOT NULL;--> statement-breakpoint
CREATE INDEX `discount_idx2` ON `discount` (`branch_idx`);