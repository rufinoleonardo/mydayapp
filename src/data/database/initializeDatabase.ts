import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const DB_NAME = "myday.db";
const expoDB = openDatabaseSync(DB_NAME);
const db = drizzle(expoDB);

export { db, DB_NAME };
