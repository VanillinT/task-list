import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks, createTask, editMultipleTasks } from "../../utils/api";
import { loggedOut } from "../auth/userInfoSlice";
import {
  dispatchNotificationForResult,
  getTokenFromCookie,
} from "../../utils/helpers";
import { modalClosed } from "./taskModalSlice";

const initialState = {
  items: [],
  unsavedItems: [],
  status: "idle",
  error: null,
  totalItems: 0,
};

export const fetchTasks = createAsyncThunk(
  "tasks/tasksLoaded",
  async (params, { getState }) => {
    const { orderBy, sortDirection, currentPage } = getState().tasksListState;
    const result = getTasks({
      page: currentPage,
      sort_field: orderBy,
      sort_direction: sortDirection,
    });
    return result;
  }
);

export const newTaskCreated = createAsyncThunk(
  "tasks/taskCreated",
  async (task, { dispatch }) => {
    const processedTask = { ...task, text: task.text.trim() };
    const result = createTask(processedTask);
    result.then((res) => {
      dispatchNotificationForResult(
        dispatch,
        res,
        "New task created successfuly"
      );
      if (res.status === "ok") {
        dispatch(modalClosed());
        dispatch(fetchTasks());
      } else if (Object.keys(res.message).includes("token")) {
        dispatch(loggedOut());
      }
    });
    return result;
  }
);

export const tasksSaved = createAsyncThunk(
  "tasks/tasksSaved",
  async (params, { dispatch, getState }) => {
    const state = getState();
    const token = getTokenFromCookie();

    const { unsavedItems } = state.tasks;
    const processedItems = unsavedItems.map((task) => ({
      ...task,
      text: task.text.trim(),
    }));

    const itemsCount = unsavedItems.length;
    const result = editMultipleTasks({ token }, processedItems);
    result.then((res) => {
      dispatchNotificationForResult(
        dispatch,
        res,
        itemsCount === 1
          ? `Task ${unsavedItems[0].id} has been updated`
          : `${itemsCount} tasks have been updated`
      );
      if (Object.keys(res.message).includes("token")) {
        dispatch(loggedOut());
      }
    });
    return result;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskEditedLocally: (state, { payload }) => {
      state.items = state.items.map((task) =>
        task.id === payload.id ? payload : task
      );
      state.unsavedItems = [
        ...state.unsavedItems.filter((task) => task.id !== payload.id),
        payload,
      ];
    },
    errorNullified: (state) => ({ ...state, error: null }),
  },
  extraReducers: {
    [fetchTasks.fulfilled]: (state, { payload }) => {
      const { message, status } = payload;
      state.status = status;
      if (status === "error") state.error = message;
      else {
        const { tasks, total_task_count } = message;
        state.items = [...tasks];
        state.totalItems = total_task_count;
      }
    },
    [newTaskCreated.fulfilled]: (state, { payload }) => {
      const { message, status } = payload;
      state.status = status;
      if (status === "error") {
        state.error = message;
      } else if (state.length < 3) state.items.push(message);
    },
    [tasksSaved.fulfilled]: (state, { payload }) => {
      const everyItemIsSaved = payload.every((msg) => msg.status === "ok");
      if (everyItemIsSaved) state.unsavedItems = [];
    },
  },
});

export default tasksSlice.reducer;

export const { taskEditedLocally, errorNullified } = tasksSlice.actions;

export const selectTasksData = (state) => ({
  tasks: state.tasks.items,
  count: state.tasks.totalItems,
});

export const selectTodoById = (state, id) =>
  state.tasks.items.find((todo) => todo.id === id);

export const selectUnsavedTasks = (state) => state.tasks.unsavedItems;
