import { TaskPriority } from "../enums/TaskPriority";
import { TaskProps } from "../types/TaskProps";

export class TaskModel implements TaskProps {
  description: string;
  isMistake: boolean;
  observation?: string | undefined;
  priority: TaskPriority;
  createdAt: Date;

  constructor(
    description: string,
    priority: TaskPriority,
    isMistake: boolean,
    observation?: string
  ) {
    (this.description = description), (this.priority = priority);
    this.isMistake = isMistake;
    this.createdAt = new Date();
    this.observation = observation || undefined;
  }
}
