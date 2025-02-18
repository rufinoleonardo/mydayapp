import { useTargetRepository } from "@/data/repositories/TargetRepository";
import { TargetProps } from "@/data/types/TargetProps";
import { convertTargetFromDb } from "@/utils/convertTargetFromDb";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export const useTargetViewModel = () => {
  const { getActiveTargets } = useTargetRepository();

  const [targets, setTargets] = useState<TargetProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  async function fetchTasks() {
    const response = await getActiveTargets();
    const preparedTargets = response.data?.map((target) =>
      convertTargetFromDb(target)
    );
    if (preparedTargets != undefined) setTargets(preparedTargets);
  }

  return { targets };
};
