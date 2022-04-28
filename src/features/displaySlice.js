import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  member: false,
  assignment: false,
};

const displaySlice = createSlice({
  name: "display",
  initialState: {
    value: initialState,
  },
  reducers: {
    toggleDisplay: (state, action) => {
      const { name } = action.payload;
      state.value = { ...state.value, [name]: !state.value[name] };
    },
  },
});

export const { toggleDisplay } = displaySlice.actions;

export default displaySlice.reducer;
