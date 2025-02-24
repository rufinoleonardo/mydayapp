import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Tasks } from "./taskSchema";

export const taskHistories = sqliteTable("task_histories", {
  id: integer("id").primaryKey().unique(),
  completedAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  taskId: integer().references(() => Tasks.id, { onDelete: "cascade" }),
});
