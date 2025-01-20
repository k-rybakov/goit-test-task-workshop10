import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./camperSlice";
import filtersReducer from "./filtersSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    campers: campersReducer,
  },
  devTools: true,
});
