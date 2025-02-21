import * as _taskHistorySchema from "@/data/database/schemas/taskHistorySchema";
import * as _tasksSchema from "@/data/database/schemas/taskSchema";
import { and, sql } from "drizzle-orm";
import { db } from "../database/initializeDatabase";

export function useTaskHistoryRepository() {
  const taskHistoryTable = _taskHistorySchema.taskHistories;
  const tasksTable = _tasksSchema.Tasks;

  // * INSERT
  async function insertRegister(taskId: number) {
    try {
      await db.insert(taskHistoryTable).values({ taskId: taskId });
      console.log("OK: Completed Task Register INSERTED");
    } catch (err) {
      console.log("Completed Register not inserted. ", err);
    }
  }

  // * GET
  async function getRegistersByMonth(month: string, year: string = "2025") {
    const monthStr = month.padStart(2, "0");

    let conditions = [
      sql`strftime('%Y-%m', ${taskHistoryTable.completedAt}) = ${
        year + "-" + monthStr
      }`,
    ];

    const dbResponse = await db
      .select()
      .from(taskHistoryTable)
      .rightJoin(tasksTable, and(...conditions));
  }

  return { insertRegister };
}
