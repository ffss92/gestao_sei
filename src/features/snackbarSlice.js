import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  severity: "success",
  variant: "filled",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    value: initialState,
  },
  reducers: {
    showSnackbar: (state, payload) => {
      state.value = { ...state.value, open: false };
      state.value = payload.payload;
    },
    hideSnackbar: (state, payload) => {
      if (payload.payload === "clickaway") return;
      state.value = { ...state.value, open: false };
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
