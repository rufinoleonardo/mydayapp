import { useTargetRepository } from "@/data/repositories/TargetRepository";
import { useTaskRepository } from "@/data/repositories/TaskRepository";
import { TargetProps } from "@/data/types/TargetProps";
import { TaskProps } from "@/data/types/TaskProps";
import { convertTargetFromDb } from "@/utils/convertTargetFromDb";
import { convertTaskFromDb } from "@/utils/convertTaskFromDb";
import { useFocusEffect } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useCallback, useState } from "react";

export const useTargetDetailsViewModel = () => {
  const { targetId } = useLocalSearchParams();
  const { getTargetById } = useTargetRepository();
  const { getTasksByTargetId, safeDeleteTaskById } = useTaskRepository();

  const [isLoading, setIsLoading] = useState(true);
  const [targetData, setTargetData] = useState<TargetProps>();
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchTarget();
      fetchTasks();
    }, [targetId])
  );

  async function fetchTarget() {
    const target = await getTargetById(Number(targetId));
    if (target !== undefined) {
      const preparedTarget = convertTargetFromDb(target);
      setTargetData(preparedTarget);
    }
  }

  async function fetchTasks() {
    try {
      setIsLoading(true);

      const tasksResponse = await getTasksByTargetId(Number(targetId));

      const tasksPrepared = tasksResponse.map((returnedTask) => {
        let actualTask = convertTaskFromDb(returnedTask);
        return actualTask;
      });

      if (tasksResponse.length > 0) {
        setTasks(tasksPrepared);
      }
    } catch (err) {
      console.log("Error at loading tasks", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeTask(id: number) {
    const updatedTasks = tasks.filter((task) => task.id != id);
    setTasks(updatedTasks);
  }

  function handleCompleteTask(taskId: number) {
    const updatedTasks = tasks.map((task) =>
      task.id == taskId ? { ...task, lastCompletedAt: new Date() } : task
    );
    setTasks(updatedTasks);
  }

  return {
    targetData,
    tasks,
    setTasks,
    //filterTasks,
    handleCompleteTask,
    isLoading,
    removeTask,
  };
};
