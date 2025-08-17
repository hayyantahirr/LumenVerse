import { configureStore } from "@reduxjs/toolkit";
import bookMarkReducer from "./bmSlice";

const store = configureStore({
  reducer: {
    bookMark: bookMarkReducer,
  },
});

export default store;
