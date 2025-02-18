import { db } from "@/data/database/initializeDatabase";
import * as mistakeSchema from "@/data/database/schemas/mistakeSchema";
import { MistakeProps } from "@/data/types/MistakeProps";
import { and, sql } from "drizzle-orm";

export const useMistakeRepository = () => {
  async function createMistake(mistake: MistakeProps) {
    try {
      const dbResponse = await db.insert(mistakeSchema.Mistakes).values({
        description: mistake.description,
        observation: mistake.observation,
        targetId: mistake.targetId,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getMistakesByMonth(month: string, year: string = "2025") {
    const monthStr = month.padStart(2, "0");

    let conditions = [
      sql`strftime('%Y-%m', ${mistakeSchema.Mistakes.createdAt}) = ${
        year + "-" + monthStr
      }`,
    ];

    try {
      const response = await db
        .select()
        .from(mistakeSchema.Mistakes)
        .where(and(...conditions));

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  return { createMistake, getMistakesByMonth };
};
