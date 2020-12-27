import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../utils/api";

const initialState = {
  loggedIn: false,
  token: null,
  status: "idle",
  error: null,
};

export const fetchToken = createAsyncThunk("auth/loggedIn", async (params) => {
  return login(params);
});

const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedOut: (state) => {
      state.loggedIn = false;
      state.token = null;
    },
    errorNullified: (state) => ({ ...state, error: null }),
  },
  extraReducers: {
    [fetchToken.fulfilled]: (state, { payload }) => {
      const { status, message } = payload;
      state.status = status;

      if (status === "error") state.error = message;
      else {
        const { token } = message;
        state.token = token;
        if (token.length > 0) state.loggedIn = true;
      }
    },
  },
});

export default userInfoSlice.reducer;

export const { loggedOut, errorNullified } = userInfoSlice.actions;

export const selectLoggedIn = (state) => state.user.loggedIn;
