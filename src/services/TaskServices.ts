import { db } from "@/database/initializeDatabase";
import * as tasksSchema from "@/database/schemas/taskSchema";
import { TaskPriority } from "@/enums/TaskPriority";
import { ErrorMessages } from "@/exceptions/ErrorMessages";
import { TaskProps } from "@/types/TaskProps";
import { desc, eq } from "drizzle-orm";

interface getAllTasksResponse {
  data: TaskProps[];
}

export const TaskService = () => {
  //  const dbInstance = useSQLiteContext();
  //  const db = drizzle(dbInstance, { schema: tasksSchema });

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

  return { getAllTasks, createTask, deleteTaskById, getTasksByDate };
};
