import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: null,
    AC: null,
    transmission: null,
    kitchen: null,
    TV: null,
    bathroom: null,
    form: null, // 3 buttons (panelTruck, fullyIntegrated, alcove)
    page: 1,
    limit: 10,
  },
  reducers: {
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetPage: (state) => {
      state.page = 1;
    },
  },
});

export const { setFilter, resetPage } = filtersSlice.actions;

export const selectNameFilter = (state) => state.filters.location;

export default filtersSlice.reducer;
