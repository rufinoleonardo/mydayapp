import { db } from "@/data/database/initializeDatabase";
import * as targetSchema from "@/data/database/schemas/targetSchema";
import { TargetProps } from "@/data/types/TargetProps";
import { and, desc, eq, sql } from "drizzle-orm";
import { useTaskRepository } from "./TaskRepository";

export const useTargetRepository = () => {
  const targetsTable = targetSchema.Targets;
  const { safeDeleteTasksByTargetId } = useTaskRepository();

  // * CREATE

  async function createTarget(
    target: Omit<TargetProps, "id" | "isActive" | "completed">
  ) {
    try {
      const dbResponse = await db.insert(targetsTable).values({
        title: target.title,
        daysToCompletion: target.daysToCompletion || 90,
      });

      return dbResponse.lastInsertRowId;
    } catch (err) {
      console.log(err);
    }
  }

  // * GET

  async function getActiveTargets(trueOnes: boolean = true) {
    try {
      const dbResponse = await db
        .select()
        .from(targetsTable)
        .where(eq(targetsTable.isActive, trueOnes))
        .orderBy(desc(targetsTable.createdAt));

      return { data: dbResponse };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        error: err,
      };
    }
  }

  async function getTargetById(targetId: number) {
    try {
      const target = await db
        .select()
        .from(targetsTable)
        .where(eq(targetsTable.id, targetId));
      return target[0];
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  async function getCompletedTargetByMonth(
    month: string,
    year: string = "2025"
  ) {
    const monthStr = month.padStart(2, "0");

    let conditions = [
      sql`strftime('%Y-%m', ${targetsTable.completedAt}) = ${
        year + "-" + monthStr
      }`,
    ];

    const dbResponse = await db
      .select()
      .from(targetsTable)
      .where(and(...conditions));

    return dbResponse;
  }

  // * UPDATE

  async function toggleActivateTarget(targetId: number) {
    try {
      const target = await getTargetById(targetId);

      if (target == undefined) {
        return { success: false };
      }

      const response = await db
        .update(targetsTable)
        .set({ isActive: target.isActive })
        .where(eq(targetsTable.id, targetId));

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async function setTargetAsCompleted(targetId: number) {
    try {
      const target = await getTargetById(targetId);

      if (target == undefined) {
        return { success: false };
      }

      const today = new Date().toISOString().split("T")[0];

      const response = await db
        .update(targetsTable)
        .set({ completed: true, completedAt: today })
        .where(eq(targetsTable.id, targetId));

      return { success: true };
    } catch (err) {
      console.log(err);
    }
  }

  async function safeDeleteTarget(targetId: number) {
    try {
      await db
        .update(targetsTable)
        .set({ isActive: false })
        .where(eq(targetsTable.id, targetId));

      await safeDeleteTasksByTargetId(targetId);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    createTarget,
    getActiveTargets,
    toggleActivateTarget,
    setTargetAsCompleted,
    getTargetById,
    safeDeleteTarget,
    getCompletedTargetByMonth,
  };
};
