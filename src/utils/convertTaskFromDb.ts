import { TaskPriority } from "@/enums/TaskPriority";

interface dbResponse {
  id: number;
  description: string;
  createdAt: string | null;
  priority: string | null;
  targetId: number;
  completedCount: number;
  isActive: boolean;
  lastCompletedAt: string | null;
  daysToCompletion: number;
}

export const convertTaskFromDb = (dbTask: dbResponse) => {
  return {
    id: dbTask.id,
    description: dbTask.description,
    createdAt: dbTask.createdAt ? new Date(dbTask.createdAt) : null,
    priority: dbTask.priority as TaskPriority | null,
    targetId: dbTask.targetId,
    completedCount: dbTask.completedCount,
    isActive: dbTask.isActive,
    daysToCompletion: dbTask.daysToCompletion,
    lastCompletedAt: dbTask.lastCompletedAt
      ? new Date(dbTask.lastCompletedAt)
      : null,
  };
};
