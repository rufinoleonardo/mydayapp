import { TaskPriority } from "../enums/TaskPriority";

export interface TaskProps {
  description: string;
  priority: TaskPriority | null;
  createdAt?: Date | null;
  isMistake: boolean | null;
  observation: string | null;
  id?: number;
}
