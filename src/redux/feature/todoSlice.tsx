import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ITask } from "./ITask";

interface TaskState {
  tasks: ITask[];
}

const initialState: TaskState = {
  tasks: [
    {
      id: "1",
      text: "Wake up at 5 in the morning!",
      check: false,
    },
    {
      id: "2",
      text: "Go to gym.",
      check: false,
    },
    {
      id: "3",
      text: "Leave for Office.",
      check: false,
    },
  ],
};

export const todoSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.unshift(action.payload);
    },
    deleteTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    updateCheck: (state, action: PayloadAction<ITask>) => {
      state.tasks = state.tasks.filter((task) => {
        if (task.id == action.payload.id) {
          task.check = !task.check;
        }
        return task;
      });
    },
  },
});

export const { addTask, deleteTask, updateCheck } = todoSlice.actions;
export const todoSelector = (state: RootState) => state.todoReducer;
export default todoSlice.reducer;
