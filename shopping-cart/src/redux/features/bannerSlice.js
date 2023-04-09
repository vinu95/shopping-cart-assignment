import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services";

export const fetchBanners = createAsyncThunk("fetchBanners", async () => {
  const { data } = await axiosInstance.get("/banners");
  return data;
});

export const initialState = {
  bannersData: [],
  loading: false,
  error: "",
};

export const bannerSlice = createSlice({
  name: "bannerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.bannersData = action.payload;
        state.loading = false;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.error = action.payload;
        state.bannersData = [];
        state.loading = false;
      });
  },
});

export const bannerReducer = bannerSlice.reducer;