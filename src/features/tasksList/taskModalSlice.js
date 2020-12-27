import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
  },
  reducers: {
    modalOpened: () => ({ open: true }),
    modalClosed: () => ({ open: false }),
  },
});

export default modalSlice.reducer;

export const { modalOpened, modalClosed } = modalSlice.actions;
