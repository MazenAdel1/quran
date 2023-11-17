import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./slices/bookmarkSlice";

export const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
  },
});
