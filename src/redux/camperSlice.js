import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SiTruenas } from "react-icons/si";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (_, { getState }) => {
    const state = getState();
    const filters = state.filters;
    const response = await axios.get("/campers", {
      params: filters,
    });
    return response.data;
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id) => {
    const response = await axios.get("/campers/" + id);
    return response.data;
  }
);

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    total: 0,
    isLoading: false,
    error: null,
    hasMore: true,
    camper: null,
    favorites: loadFavorites(),
  },
  reducers: {
    resetCampers: (state) => {
      state.items = [];
      state.total = 0;
      state.hasMore = true;
    },
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      if (state.favorites.includes(camperId)) {
        state.favorites = state.favorites.filter((id) => id !== camperId);
      } else {
        state.favorites.push(camperId);
      }
      saveFavorites(state.favorites);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = [...state.items, ...action.payload.items];
        state.total = action.payload.total;
        state.hasMore = state.total > 0 && state.items.length < state.total;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.camper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const campersReducer = campersSlice.reducer;

export const { resetCampers, toggleFavorite } = campersSlice.actions;

export default campersReducer;
