import { TargetProps } from "@/data/types/TargetProps";

interface DbTargetProps {
  title: string;
  daysToCompletion: number | null;
  id: number;
  createdAt: string | null;
  completed: boolean | null;
  isActive: boolean | null;
}

export function convertTargetFromDb(dbTarget: DbTargetProps): TargetProps {
  return {
    id: dbTarget.id,
    completed: dbTarget.completed as boolean,
    createdAt: new Date(dbTarget.createdAt as string),
    daysToCompletion: dbTarget.daysToCompletion as number,
    isActive: dbTarget.isActive as boolean,
    title: dbTarget.title,
  };
}
