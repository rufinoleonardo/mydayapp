import { TaskService } from "@/services/TaskServices";
import { TaskProps } from "@/types/TaskProps";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useHomeViewModel = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { deleteTaskById, getTasksByDate } = TaskService();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (dateString?: string) => {
    try {
      setLoading(true);
      const response = await getTasksByDate(dateString);
      if (response) {
        setTasks(response.data);
      }
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

  return { tasks, loading, removeTask, fetchTasks };
};
