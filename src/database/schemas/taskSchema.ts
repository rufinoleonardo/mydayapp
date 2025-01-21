import { TaskPriority } from "@/enums/TaskPriority";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey(),
  description: text().notNull(),
  priority: text().default(TaskPriority.COMMON),
  createdAt: text().default(sql`(CURRENT_DATE)`),
  isMistake: integer({ mode: "boolean" }).default(false),
  observation: text(),
});
