import { TaskPriority } from "../enums/TaskPriority";

export interface TaskProps {
  description: string;
  priority: TaskPriority;
  createdAt: Date;
  isMistake: boolean;
  observation?: string;
  id?: number;
}
