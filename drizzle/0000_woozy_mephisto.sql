CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY NOT NULL,
	`description` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_DATE),
	`isMistake` integer DEFAULT false,
	`observation` text
);
