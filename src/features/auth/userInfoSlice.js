import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../utils/api";
import { getTokenFromCookie, putTokenInCookie } from "../../utils/helpers";

const cookieToken = getTokenFromCookie();

const initialState = {
  loggedIn: !!cookieToken.length,
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
      putTokenInCookie("");
      state.loggedIn = false;
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
        putTokenInCookie(token);
        if (token.length > 0) state.loggedIn = true;
      }
    },
  },
});

export default userInfoSlice.reducer;

export const { loggedOut, errorNullified } = userInfoSlice.actions;

export const selectLoggedIn = (state) => state.user.loggedIn;
