import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const Targets = sqliteTable("targets", {
  id: integer("id").primaryKey(),
  title: text().notNull().unique(),
  createdAt: text().default(sql`(CURRENT_DATE)`),
  completed: integer({ mode: "boolean" }).default(false),
  daysToCompletion: integer().default(90),
  isActive: integer({ mode: "boolean" }).default(true),
});
