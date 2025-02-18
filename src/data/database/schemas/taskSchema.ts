import { TaskPriority } from "@/enums/TaskPriority";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Targets } from "./targetSchema";

export const Tasks = sqliteTable("tasks", {
  description: text().notNull(),
  isActive: integer({ mode: "boolean" }).default(true).notNull(),
  priority: text().default(TaskPriority.COMMON),
  daysToCompletion: integer().notNull(),
  lastCompletedAt: text("last_completed_at"),

  id: integer("id").primaryKey(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  completedCount: integer().default(0).notNull(),
  targetId: integer("target_id")
    .references(() => Targets.id, { onDelete: "cascade" })
    .notNull(),
});
