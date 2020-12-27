import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationAdded: (state, { payload }) => {
      state.items.push(payload);
    },
    notificationRemoved: (state, { payload }) => {
      return {
        items: state.items.filter(
          (notification) => notification.key !== payload
        ),
      };
    },
  },
});

export default notificationsSlice.reducer;

export const {
  notificationAdded,
  notificationRemoved,
} = notificationsSlice.actions;
