import { ErrorMessages } from "@/exceptions/ErrorMessages";
import { TaskService } from "@/services/TaskServices";
import { TaskProps } from "@/types/TaskProps";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

interface getAllTasksResponse {
  data: TaskProps[];
}

export const useNewTaskViewModel = () => {
  const { createTask } = TaskService();
  const router = useRouter();

  async function addTask(task: TaskProps) {
    try {
      await createTask(task);
      router.navigate("/");
    } catch (err) {
      console.log(
        ErrorMessages.returnDbError(ErrorMessages.db, "insert", "tasks")
      );
      Alert.alert("Error", "Task not added.");
    }
  }

  return { addTask };
};
