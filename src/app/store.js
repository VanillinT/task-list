import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasksList/tasksSlice";
import tasksListStateSlice from "../features/tasksList/tasksListStateSlice";
import taskModalReducer from "../features/tasksList/taskModalSlice";
import userInfoSlice from "../features/auth/userInfoSlice";
import notificationsSlice from "../features/notifications/notificationsSlice";

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    tasksListState: tasksListStateSlice,
    newTaskModal: taskModalReducer,
    user: userInfoSlice,
    notifications: notificationsSlice,
  },
});
