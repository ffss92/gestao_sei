import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import drawerReducer from "./features/drawerSlice";
import displaySlice from "./features/displaySlice";
import snackbarSlice from "./features/snackbarSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    drawer: drawerReducer,
    display: displaySlice,
    snackbar: snackbarSlice,
  },
});

export default store;
