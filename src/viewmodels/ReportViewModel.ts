import { useMistakeRepository } from "@/data/repositories/MistakeRepository";
import { useTargetRepository } from "@/data/repositories/TargetRepository";
import { useTaskCompletionRepository } from "@/data/repositories/TaskCompletionRepository";
import { TaskProps } from "@/data/types/TaskProps";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export const useReportViewModel = () => {
  const { getRegistersByMonth } = useTaskCompletionRepository();
  const { getMistakesByMonth } = useMistakeRepository();
  const { getCompletedTargetByMonth } = useTargetRepository();

  const [nMistakes, setNumMistakes] = useState(0);
  const [nTasks, setNumTasks] = useState(0);
  const [nTargets, setNumTargets] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState<string>();
  const [selectedYear, setSelectedYear] = useState<string>();
  const [loadingData, setLoadingData] = useState(false);

  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      getMonthAndYear();
    }, [])
  );

  const getMonthAndYear = () => {
    let todayStr = new Date().toISOString().split("T")[0];
    const [year, month] = todayStr.split("-");
    setSelectedMonth(month);
    setSelectedYear(year);
    console.log(selectedYear, selectedMonth);
    return;
  };

  async function loadTasks(month: string, year: string = "2025") {
    try {
      setLoadingData(true);
      const completedTasks = await getRegistersByMonth(month, year);
      const madeMistakes = await getMistakesByMonth(month, year);
      const completedTargets = await getCompletedTargetByMonth(month, year);

      setNumTasks(completedTasks.response.length);
      setNumMistakes(madeMistakes.length);
      setNumTargets(completedTargets.length);
    } catch (err) {
      console.log("Data fetching error. ", err);
    } finally {
      setLoadingData(false);
    }
  }

  return {
    nMistakes,
    nTasks,
    nTargets,
    tasks,
    loadTasks,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
  };
};
