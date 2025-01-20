import { PrismaClient } from "@prisma/client/react-native";
import { reactiveHooksExtension } from "@prisma/react-native";

const baseClient = new PrismaClient({
  log: ["query", "info", "warn"],
});

export const prismaClient = baseClient.$extends(reactiveHooksExtension());

export async function initializeDb() {
  try {
    console.log("Try do initializeDB");
    baseClient.$applyPendingMigrations();
  } catch (err) {
    console.log("Failed to apply migrations", err);
    throw new Error("Failed initialize db");
  }
}
