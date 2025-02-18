PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tasks` (
	`id` integer PRIMARY KEY NOT NULL,
	`description` text NOT NULL,
	`priority` text DEFAULT 'common',
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`isActive` integer DEFAULT true NOT NULL,
	`last_completed_at` text,
	`completedCount` integer DEFAULT 0 NOT NULL,
	`target_id` integer NOT NULL,
	`daysToCompletion` integer NOT NULL,
	FOREIGN KEY (`target_id`) REFERENCES `targets`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_tasks`("id", "description", "priority", "created_at", "isActive", "last_completed_at", "completedCount", "target_id", "daysToCompletion") SELECT "id", "description", "priority", "created_at", "isActive", "last_completed_at", "completedCount", "target_id", "daysToCompletion" FROM `tasks`;--> statement-breakpoint
DROP TABLE `tasks`;--> statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;