import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    value: initialState,
  },
  reducers: {
    toggleDrawer: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
