import { createSlice } from "@reduxjs/toolkit";

const bookMarkSlice = createSlice({
  name: "bookMark",
  initialState: [],
  reducers: {
    addToBookMark: (state, action) => {
      state.push(action.payload);
      console.log("state", state);
      console.log("action", action);
    },
    removeFromBookMark: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToBookMark, removeFromBookMark } = bookMarkSlice.actions;
export default bookMarkSlice.reducer;
