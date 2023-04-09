import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services";

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const { data } = await axiosInstance.get("/categories");
  return data;
});

export const initialState = {
  categoriesData: [],
  selectedCategory: "",
  loading: false,
  error: "",
};

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload ?? "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        let categories = action.payload;
        categories = categories
          ?.filter((eachItem) => eachItem.name !== "Seafood")
          .sort((a, b) => a.order - b.order);
        state.categoriesData = categories;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.categoriesData = [];
        state.loading = false;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
export const { setSelectedCategory } = categorySlice.actions;
