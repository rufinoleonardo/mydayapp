CREATE TABLE `task_histories` (
	`id` integer PRIMARY KEY NOT NULL,
	`completedAt` text DEFAULT (CURRENT_TIMESTAMP),
	`taskId` integer,
	FOREIGN KEY (`taskId`) REFERENCES `tasks`(`id`) ON UPDATE no action ON DELETE cascade
);
