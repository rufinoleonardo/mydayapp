import * as _taskHistorySchema from "@/data/database/schemas/taskHistorySchema";
import * as _tasksSchema from "@/data/database/schemas/taskSchema";
import { and, eq, isNotNull, sql } from "drizzle-orm";
import { db } from "../database/initializeDatabase";

interface TaskCompletionProps {
  task_histories: {
    id: number;
    completedAt: string | null;
    taskId: number | null;
  } | null;
  tasks: {
    id: number;
    description: string;
    isActive: boolean;
    priority: string | null;
    daysToCompletion: number;
    lastCompletedAt: string | null;
    createdAt: string | null;
    completedCount: number;
    targetId: number;
  };
}

export function useTaskCompletionRepository() {
  const taskHistoryTable = _taskHistorySchema.taskHistories;
  const tasksTable = _tasksSchema.Tasks;

  // * INSERT
  async function insertRegister(taskId: number) {
    try {
      await db.insert(taskHistoryTable).values({ taskId: taskId });
      console.log("OK: Completed Task Register INSERTED. ID: ", taskId);
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

    const dbResponse: TaskCompletionProps[] = await db
      .select()
      .from(taskHistoryTable)
      .innerJoin(tasksTable, eq(taskHistoryTable.taskId, tasksTable.id))
      .where(and(...conditions, isNotNull(taskHistoryTable.completedAt)));

    const preparedTasks = dbResponse.map((taskCompletion) => ({
      completionId: taskCompletion.task_histories?.id,
      completedAt: taskCompletion.task_histories?.completedAt,
      description: taskCompletion.tasks.description,
    }));

    return { response: preparedTasks };
  }

  return { insertRegister, getRegistersByMonth };
}
