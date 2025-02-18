import { useTaskRepository } from "@/data/repositories/TaskRepository";
import { TaskProps } from "@/data/types/TaskProps";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useReportViewModel = () => {
  const [nMistakes, setNMistakes] = useState(0);
  const [nRegularTasks, setNRegularTasks] = useState(0);
  const [nMonthlyTasks, setNMontlyTasks] = useState(0);

  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const { countTasksByMonth, getTasksByMonth, deleteTaskById } =
    useTaskRepository();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    countMonthlyTaks();
    countMistakes();
    countRegularTasks();
  }, []);

  async function countMistakes(month?: string, year: string = "2025") {
    let searchMonth = month || currentMonth;

    let response = await countTasksByMonth(String(searchMonth), year);

    setNMistakes(response);
  }

  async function countRegularTasks(month?: string, year: string = "2025") {
    let searchMonth = month || currentMonth;

    let response = await countTasksByMonth(String(searchMonth), year);

    setNRegularTasks(response);
  }

  async function countMonthlyTaks(month?: string, year: string = "2025") {
    let searchMonth = month || currentMonth;

    let response = await countTasksByMonth(String(searchMonth), year);

    setNMontlyTasks(response);
  }

  async function loadTasks(month: string, year: string = "2025") {
    const result = await getTasksByMonth(month, year);
    setTasks(result.data);
  }

  async function researchData(month?: string, year?: string) {
    countMonthlyTaks(month, year);
    countMistakes(month, year);
    countRegularTasks(month, year);
  }

  const removeTask = async (id: number) => {
    try {
      await deleteTaskById(id);
      setTasks((prev) => prev.filter((task) => task.id != id));
      Alert.alert("Success", "Task deleted.");
    } catch (err) {
      Alert.alert("Error", "Tasks not deleted. Try again.");
    }
  };

  return {
    nMistakes,
    nRegularTasks,
    nMonthlyTasks,
    researchData,
    tasks,
    loadTasks,
    removeTask,
  };
};
