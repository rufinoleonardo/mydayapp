CREATE TABLE `mistakes` (
	`id` integer PRIMARY KEY NOT NULL,
	`description` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`observation` text,
	`targetId` integer NOT NULL,
	FOREIGN KEY (`targetId`) REFERENCES `targets`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `targets` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_DATE),
	`completed` integer DEFAULT false,
	`daysToCompletion` integer DEFAULT 90
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tasks` (
	`id` integer PRIMARY KEY NOT NULL,
	`description` text NOT NULL,
	`priority` text DEFAULT 'common',
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`completed` integer DEFAULT false,
	`targetId` integer NOT NULL,
	FOREIGN KEY (`targetId`) REFERENCES `targets`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_tasks`("id", "description", "priority", "createdAt", "completed", "targetId") SELECT "id", "description", "priority", "createdAt", "completed", "targetId" FROM `tasks`;--> statement-breakpoint
DROP TABLE `tasks`;--> statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;