import { createSlice } from "react-redux";

const initialState = {
  forms: {},
  errors: {},
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    initForm: (state, { payload }) => {
      const { formName, fieldsOptionsMap } = payload;
      state[formName] = fieldsOptionsMap;
    },
    updateFormField: (state, { payload }) => {
      const { formName, field, value } = payload;
      state.forms[formName][field].value = value;
      state.errors[formName][field] = "";
    },
    resetForm: (state, { payload }) => {
      const { formName } = payload;
      const formKeys = Object.keys(state.forms[formName]);
      const formValues = formKeys.reduce(
        (acc, key) => ({ ...acc, [key]: "" }),
        {}
      );
      state[formName] = formValues;
    },
  },
});

export default formSlice.reducer;

export const { initForm, updateFormField, resetForm } = formSlice.actions;
