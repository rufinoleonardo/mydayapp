import { db } from "@/database/initializeDatabase";
import * as tasksSchema from "@/database/schemas/taskSchema";
import { TaskPriority } from "@/enums/TaskPriority";
import { ErrorMessages } from "@/exceptions/ErrorMessages";
import { TaskProps } from "@/types/TaskProps";
import { and, count, desc, eq, sql } from "drizzle-orm";

interface getAllTasksResponse {
  data: TaskProps[];
}

export const TaskService = () => {
  async function getAllTasks(): Promise<getAllTasksResponse> {
    try {
      const dbResponse = await db
        .select()
        .from(tasksSchema.tasks)
        .orderBy(desc(tasksSchema.tasks.createdAt));

      const response: TaskProps[] = dbResponse.map((task) => ({
        id: task.id,
        description: task.description,
        createdAt: task.createdAt ? new Date(task.createdAt) : null,
        isMistake: task.isMistake,
        observation: task.observation,
        priority: task.priority as TaskPriority | null,
      }));

      console.log(response);
      return { data: response };
    } catch (err) {
      console.log("ERROR: Select failed.");
      console.log(err);
      return { data: [] };
    }
  }

  async function getTasksByDate(date?: string) {
    let queryDate = "";

    if (date) {
      queryDate = date;
    } else {
      queryDate = new Date().toISOString().split("T")[0];
    }

    try {
      const dbResponse = await db
        .select()
        .from(tasksSchema.tasks)
        .where(eq(tasksSchema.tasks.createdAt, queryDate));

      const response: TaskProps[] = dbResponse.map((task) => ({
        id: task.id,
        description: task.description,
        createdAt: task.createdAt ? new Date(task.createdAt) : null,
        isMistake: task.isMistake,
        observation: task.observation,
        priority: task.priority as TaskPriority | null,
      }));

      return { data: response };
    } catch (err) {
      console.log(err);
      return { data: [] };
    }
  }

  async function getTasksByMonth(
    month: string,
    year: string = "2025",
    isMistake?: boolean
  ) {
    const monthStr = month.padStart(2, "0");

    let conditions = [
      sql`strftime('%Y-%m', ${tasksSchema.tasks.createdAt}) = ${
        year + "-" + monthStr
      }`,
    ];

    if (isMistake !== undefined) {
      conditions.push(eq(tasksSchema.tasks.isMistake, isMistake));
    }

    const dbResponse = await db
      .select()
      .from(tasksSchema.tasks)
      .where(and(...conditions));

    const response: TaskProps[] = dbResponse.map((task) => ({
      id: task.id,
      description: task.description,
      createdAt: task.createdAt ? new Date(task.createdAt) : null,
      isMistake: task.isMistake,
      observation: task.observation,
      priority: task.priority as TaskPriority | null,
    }));

    return { data: response };
  }

  async function countTasksByMonth(
    month: string,
    year: string = "2025",
    isMistake?: boolean
  ) {
    const monthStr = month.padStart(2, "0");

    const conditions = [
      sql`strftime('%Y-%m', ${tasksSchema.tasks.createdAt}) = ${
        year + "-" + monthStr
      }`,
    ];

    if (isMistake !== undefined) {
      conditions.push(eq(tasksSchema.tasks.isMistake, isMistake));
    }

    const result = await db
      .select({ total: count() })
      .from(tasksSchema.tasks)
      .where(and(...conditions));

    return result[0]?.total || 0;
  }

  async function createTask(task: TaskProps) {
    try {
      const response = await db.insert(tasksSchema.tasks).values({
        description: task.description,
        isMistake: task.isMistake,
        priority: task.priority,
        observation: task.observation,
      });

      const id = response.lastInsertRowId;

      console.log({ id });
      return {
        id,
      };
    } catch (err) {
      console.log(
        ErrorMessages.returnDbError(ErrorMessages.db, "insert", "tasks")
      );
    }
  }

  async function deleteTaskById(id: number) {
    try {
      const response = await db
        .delete(tasksSchema.tasks)
        .where(eq(tasksSchema.tasks.id, id));
      console.log({ id: response.lastInsertRowId });
    } catch (err) {
      console.log(err);
    }
  }

  return {
    getAllTasks,
    createTask,
    deleteTaskById,
    getTasksByDate,
    getTasksByMonth,
    countTasksByMonth,
  };
};
