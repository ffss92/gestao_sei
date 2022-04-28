import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logged_in: false,
  id: 0,
  email: "",
  is_active: false,
  is_admin: false,
  created_at: "",
  updated_at: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialState,
  },
  reducers: {
    signIn: (state, action) => {
      state.value = { ...action.payload, logged_in: true };
    },
    signOut: (state) => {
      state.value = initialState;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
