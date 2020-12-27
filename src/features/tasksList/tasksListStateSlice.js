import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderBy: null,
  sortDirection: "desc",
  currentPage: 1,
};

const listStateSlice = createSlice({
  name: "tasksListState",
  initialState,
  reducers: {
    orderByChanged: (state, { payload }) => ({
      ...state,
      orderBy: payload,
    }),
    sortDirectionChanged: (state, { payload }) => ({
      ...state,
      sortDirection: payload,
    }),
    currentPageChanged: (state, { payload }) => ({
      ...state,
      currentPage: payload,
    }),
  },
});

export default listStateSlice.reducer;

export const {
  orderByChanged,
  sortDirectionChanged,
  currentPageChanged,
} = listStateSlice.actions;

export const selectTaskListState = (state) => state.tasksListState;
