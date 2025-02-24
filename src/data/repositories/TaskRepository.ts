import { db } from "@/data/database/initializeDatabase";
import * as tasksSchema from "@/data/database/schemas/taskSchema";
import { TaskInsertionProps, TaskProps } from "@/data/types/TaskProps";
import { convertDateToString } from "@/utils/convertDateToString";
import { convertTaskFromDb } from "@/utils/convertTaskFromDb";
import { and, desc, eq } from "drizzle-orm";
import { useTaskCompletionRepository } from "./TaskCompletionRepository";

interface getAllTasksResponse {
  data: TaskProps[];
}

export const useTaskRepository = () => {
  const tasksTable = tasksSchema.Tasks;
  const { insertRegister } = useTaskCompletionRepository();

  // * GET FUNCTIONALITIES

  async function getAllTasks(
    isActive: boolean = true
  ): Promise<getAllTasksResponse> {
    try {
      const dbResponse = await db
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.isActive, isActive))
        .orderBy(desc(tasksTable.createdAt));

      const response: TaskProps[] = dbResponse.map((task) =>
        convertTaskFromDb(task)
      );

      return { data: response };
    } catch (err) {
      console.log("ERROR: Select failed.");
      console.log(err);
      return { data: [] };
    }
  }

  async function getTaskById(id: number) {
    const dbResponse = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, id));

    return { data: dbResponse[0] };
  }

  async function getTasksByDate(date?: string, isActive: boolean = true) {
    let queryDate = "";

    if (date) {
      queryDate = date;
    } else {
      queryDate = new Date().toISOString().split("T")[0];
    }

    try {
      const dbResponse = await db
        .select()
        .from(tasksTable)
        .where(
          and(
            eq(tasksTable.createdAt, queryDate),
            eq(tasksTable.isActive, isActive)
          )
        );

      const response: TaskProps[] = dbResponse.map((task) =>
        convertTaskFromDb(task)
      );

      return { data: response };
    } catch (err) {
      console.log(err);
      return { data: [] };
    }
  }

  async function getTasksByTargetId(
    targetId: number,
    isActive: boolean = true
  ) {
    const dbResponse = await db
      .select()
      .from(tasksTable)
      .where(
        and(
          eq(tasksTable.targetId, targetId),
          eq(tasksTable.isActive, isActive)
        )
      );

    return dbResponse;
  }

  // * CREATE

  async function createTask(task: TaskInsertionProps) {
    try {
      const response = await db.insert(tasksTable).values({
        description: task.description,
        priority: task.priority,
        targetId: task.targetId as number,
        daysToCompletion: task.daysToCompletion,
      });

      const id = response.lastInsertRowId;

      console.log({ id });
      return {
        id,
      };
    } catch (err) {
      console.log("CreateTask failed.", err);
    }
  }

  // * UPDATE

  async function safeDeleteTaskById(id: number) {
    try {
      let dbResponse = await db
        .update(tasksTable)
        .set({ isActive: false })
        .where(eq(tasksTable.id, id));
      return { success: true, id: dbResponse.lastInsertRowId };
    } catch (err) {
      console.log(err);
    }
  }

  async function safeDeleteTasksByTargetId(targetId: number) {
    await db
      .update(tasksTable)
      .set({ isActive: false })
      .where(eq(tasksTable.targetId, targetId));
  }

  async function setTaskAsCompleted(id: number) {
    try {
      const response = await getTaskById(id);

      if (response.data == undefined) {
        throw new Error("Task not found.");
      }

      const newCompletedCount = response.data.completedCount++;
      const newLastCompletedAt = convertDateToString(new Date());

      await db
        .update(tasksTable)
        .set({
          completedCount: newCompletedCount,
          lastCompletedAt: newLastCompletedAt,
        })
        .where(eq(tasksTable.id, id));

      await insertRegister(id);

      return { success: true, newCompletedCount, newLastCompletedAt };
    } catch (err) {
      console.log(err);
    }
  }

  // ! DELETE

  async function destroyTaskById(id: number) {
    try {
      const response = await db.delete(tasksTable).where(eq(tasksTable.id, id));
      console.log({ id: response.lastInsertRowId });
    } catch (err) {
      console.log(err);
    }
  }

  return {
    getAllTasks,
    createTask,
    destroyTaskById,
    getTasksByDate,
    getTasksByTargetId,
    safeDeleteTaskById,
    setTaskAsCompleted,
    safeDeleteTasksByTargetId,
  };
};
