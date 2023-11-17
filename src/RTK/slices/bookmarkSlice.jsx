import { createSlice } from "@reduxjs/toolkit";

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: localStorage.savePages
    ? JSON.parse(localStorage.savePages)
    : [],
  reducers: {
    saveBookmark: (state, action) => {
      state = [...state, action.payload];
      return state;
    },
    deleteBookmark: (state, action) => {
      state = state.filter((el) => el != action.payload);
      return state;
    },
    saveToLocalStorage: (state) => {
      return localStorage.setItem(`savePages`, JSON.stringify(state));
    },
    cleanBookmark: (state) => {
      state = [];
      return state;
    },
  },
});

export const {
  saveBookmark,
  deleteBookmark,
  saveToLocalStorage,
  cleanBookmark,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
