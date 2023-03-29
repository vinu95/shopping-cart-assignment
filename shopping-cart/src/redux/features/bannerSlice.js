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
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.bannersData = action.payload;
        state.pending = false;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.error = action.payload;
        state.bannersData.data = [];
        state.pending = false;
      });
  },
});

export const bannerReducer = bannerSlice.reducer;