import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const { data } = await axiosInstance.get("/products");
  return data;
});

export const initialState = {
  productsData: [],
  loading: false,
  error: "",
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsData = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.productsData = [];
        state.loading = false;
      });
  },
});

export const productReducer = productSlice.reducer;
