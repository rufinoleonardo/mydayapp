import { TaskService } from "@/services/TaskServices";
import { TaskProps } from "@/types/TaskProps";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

// createdAt": 2025-01-22T00:00:00.000Z

export const useHomeViewModel = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { getAllTasks, deleteTaskById } = TaskService();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getAllTasks();
      setTasks(response.data);
    } catch (err) {
      Alert.alert("ERROR", "Tasks loading failed.");
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id: number) => {
    try {
      await deleteTaskById(id);
      setTasks((prev) => prev.filter((task) => task.id != id));
      Alert.alert("Success", "Task deleted.");
    } catch (err) {
      Alert.alert("Error", "Tasks not deleted. Try again.");
    }
  };

  return { tasks, loading, removeTask };
};
