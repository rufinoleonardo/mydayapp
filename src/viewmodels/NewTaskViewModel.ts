import * as tasksSchema from "@/database/schemas/taskSchema";
import { TaskPriority } from "@/enums/TaskPriority";
import { ErrorMessages } from "@/exceptions/ErrorMessages";
import { TaskProps } from "@/types/TaskProps";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

interface getAllTasksResponse {
  data: TaskProps[];
}

export const useNewTaskViewModel = () => {
  const dbInstance = useSQLiteContext();
  const db = drizzle(dbInstance, { schema: tasksSchema });

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

  return { getAllTasks, createTask };
};
