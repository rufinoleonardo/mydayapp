import { TaskProps } from "@/data/types/TaskProps";
import { compareDbDateWithToday } from "./compareDbDateWithToday";

export function filterTasks(
  showing: "completed" | "to do",
  tasks: TaskProps[]
) {
  switch (showing) {
    case "to do":
      let toDoOnes = tasks.filter(
        (task) =>
          task.lastCompletedAt == null ||
          !compareDbDateWithToday(task.lastCompletedAt)
      );
      return toDoOnes;
    case "completed":
      let completeOnes = tasks.filter(
        (task) =>
          task.lastCompletedAt != null &&
          compareDbDateWithToday(task.lastCompletedAt)
      );
      return completeOnes;
  }
}
