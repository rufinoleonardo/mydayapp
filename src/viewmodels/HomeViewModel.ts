import { useTaskRepository } from "@/data/repositories/TaskRepository";
import { TaskProps } from "@/data/types/TaskProps";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useHomeViewModel = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { safeDeleteTaskById, getAllTasks } = useTaskRepository();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getAllTasks();
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
    setTasks((prev) => prev.filter((task) => task.id != id));
  };

  return { tasks, loading, removeTask, fetchTasks };
};
