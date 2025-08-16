import { createSlice } from "@reduxjs/toolkit";

const bmSlice = createSlice({
  name: "bookMark",
  initialState: [],
  reducers: {
    addToBookMark: (state, action) => {
      state.push(action.payload);
    },
    removeFromBookMark: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToBookMark, removeFromBookMark } = bmSlice.actions;
export default bmSlice.reducer;
