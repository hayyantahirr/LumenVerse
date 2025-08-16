import { configureStore } from "@reduxjs/toolkit";
import bmSlice from "./bmSlice";

const store = configureStore({
  reducer: {
    bookmark: bmSlice,
  },
});

export default store;
