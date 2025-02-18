import { TaskPriority } from "@/enums/TaskPriority";

export interface TaskProps {
  description: string;
  priority: TaskPriority | null;
  createdAt?: Date | null;
  targetId: number;
  isActive: boolean;
  completedCount: number;
  lastCompletedAt: Date | null;
  daysToCompletion: number;
  id: number;
}

export interface TaskInsertionProps {
  description: string;
  priority: TaskPriority;
  daysToCompletion: number;
  targetId: number | string;
}
