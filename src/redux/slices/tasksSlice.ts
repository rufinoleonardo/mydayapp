import { TaskProps } from "@/data/types/TaskProps";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TasksState {
  tasksByTarget: Record<string, TaskProps[]>;
}

const initialState: TasksState = {
  tasksByTarget: {},
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    tasksLoaded: (
      state,
      action: PayloadAction<{ targetId: string; tasks: TaskProps[] }>
    ) => {
      const { targetId, tasks } = action.payload;
      state.tasksByTarget[targetId] = tasks;
    },

    taskAdded: (
      state,
      actions: PayloadAction<{ targetId: string; task: TaskProps }>
    ) => {
      const { targetId, task } = actions.payload;

      if (!state.tasksByTarget[targetId]) {
        state.tasksByTarget[targetId] = [];
      }

      state.tasksByTarget[targetId].push(task);
    },

    taskDeleted: (
      state,
      action: PayloadAction<{ targetId: string; taskId: number }>
    ) => {
      const { targetId, taskId } = action.payload;
      state.tasksByTarget[targetId] = state.tasksByTarget[targetId].filter(
        (task) => task.id != taskId
      );
    },
  },
});

export const { tasksLoaded, taskAdded, taskDeleted } = tasksSlice.actions;
export default tasksSlice.reducer;
