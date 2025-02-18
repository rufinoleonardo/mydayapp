import { useTargetRepository } from "@/data/repositories/TargetRepository";
import { TargetProps } from "@/data/types/TargetProps";
import { router } from "expo-router";

export const useNewTargetViewModel = () => {
  const { createTarget } = useTargetRepository();

  async function newTarget(
    target: Omit<TargetProps, "id" | "isActive" | "completed">
  ) {
    try {
      const targetId = await createTarget(target);

      router.replace({
        pathname: `/target/details/${targetId}`,
        params: {
          daysToCompletion: target.daysToCompletion,
          title: target.title,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return { newTarget };
};
