import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Targets } from "./targetSchema";

export const Mistakes = sqliteTable("mistakes", {
  id: integer("id").primaryKey(),
  description: text().notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  observation: text(),
  targetId: integer()
    .references(() => Targets.id, { onDelete: "cascade" })
    .notNull(),
});
