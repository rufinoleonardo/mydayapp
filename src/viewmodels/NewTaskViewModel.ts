import { useMistakeRepository } from "@/data/repositories/MistakeRepository";
import { useTaskRepository } from "@/data/repositories/TaskRepository";
import { MistakeProps } from "@/data/types/MistakeProps";
import { TaskInsertionProps, TaskProps } from "@/data/types/TaskProps";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export const useNewTaskViewModel = () => {
  const { createTask } = useTaskRepository();
  const { createMistake } = useMistakeRepository();
  const router = useRouter();

  function isTask(task: TaskProps | MistakeProps): task is TaskProps {
    return (task as TaskProps).priority !== undefined;
  }

  function navigateToTarget(targetIdParam: number | string) {
    router.navigate(`target/details/${targetIdParam}`);
  }

  async function addTask(
    task: TaskInsertionProps,
    targetIdParam: string | number,
    daysToCompletion: string | number
  ) {
    const preparedTask: TaskInsertionProps = {
      description: task.description,
      priority: task.priority,
      targetId: Number(targetIdParam),
      daysToCompletion: Number(daysToCompletion),
    };

    try {
      await createTask(preparedTask);
      navigateToTarget(Number(targetIdParam));
    } catch (err) {
      Alert.alert("Error", "Task not added.");
    }
  }

  async function addMistake(
    mistake: Omit<MistakeProps, "targetId">,
    targetId: string | number
  ) {
    try {
      const preparedMistake: MistakeProps = {
        description: mistake.description,
        observation: mistake.observation,
        targetId: Number(targetId),
      };
      await createMistake(preparedMistake);
      navigateToTarget(targetId);
    } catch (err) {
      Alert.alert("Error", "Mistake not added.");
      console.log(err);
    }
  }

  return { addTask, addMistake, isTask };
};
