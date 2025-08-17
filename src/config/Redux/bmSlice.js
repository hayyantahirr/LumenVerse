import { createSlice } from "@reduxjs/toolkit";

const bookMarkSlice = createSlice({
  name: "bookMark",
  initialState: [],
  reducers: {
    addToBookMark: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.push(action.payload); // only add if not already there
      }
    },
    removeFromBookMark: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
     clearBookMark: () => {
      return []; // simply reset to empty array
    },
  },
});

export const { addToBookMark, removeFromBookMark ,clearBookMark } = bookMarkSlice.actions;
export default bookMarkSlice.reducer;
