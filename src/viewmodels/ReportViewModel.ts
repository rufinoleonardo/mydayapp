import { TaskService } from "@/services/TaskServices";
import { TaskProps } from "@/types/TaskProps";
import { useEffect, useState } from "react";

export const useReportViewModel = () => {
  const [nMistakes, setNMistakes] = useState(0);
  const [nRegularTasks, setNRegularTasks] = useState(0);
  const [nMonthlyTasks, setNMontlyTasks] = useState(0);

  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { countTasksByMonth, getTasksByMonth } = TaskService();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    countMonthlyTaks();
    countMistakes();
    countRegularTasks();
  }, []);

  async function countMistakes(month?: string, year: string = "2025") {
    let searchMonth = month || currentMonth;

    let response = await countTasksByMonth(String(searchMonth), year, true);

    setNMistakes(response);
  }

  async function countRegularTasks(month?: string, year: string = "2025") {
    let searchMonth = month || currentMonth;

    let response = await countTasksByMonth(String(searchMonth), year, false);

    setNRegularTasks(response);
  }

  async function countMonthlyTaks(month?: string, year: string = "2025") {
    let searchMonth = month || currentMonth;

    let response = await countTasksByMonth(String(searchMonth), year);

    setNMontlyTasks(response);
  }

  async function loadTasks(
    month: string,
    year: string = "2025",
    isMistake?: boolean
  ) {
    const result = await getTasksByMonth(month, year, isMistake);
    setTasks(result.data);
  }

  async function researchData(month?: string, year?: string) {
    countMonthlyTaks(month, year);
    countMistakes(month, year);
    countRegularTasks(month, year);
  }

  return {
    nMistakes,
    nRegularTasks,
    nMonthlyTasks,
    researchData,
    tasks,
    loadTasks,
  };
};
