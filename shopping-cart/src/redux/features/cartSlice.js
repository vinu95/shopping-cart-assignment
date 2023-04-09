import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services";

export const addItemsToCart = createAsyncThunk(
  "addItemsToCart",
  async (product) => {
    // const payload = {
    //   productId: product.id,
    // };
    const { data } = await axiosInstance.post("/addToCart");
    return { data, product };
  }
);

export const initialState = {
  isCartOpen: false,
  selectedProducts: [],
  totalPrice: 0,
  totalProducts: 0,
  loading: false,
  error: "",
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartVisibility: (state, action) => {
      state.isCartOpen = action.payload;
    },
    increaseQuantity: (state, action) => {
      state.selectedProducts = state.selectedProducts.map((eachProduct) => {
        if (eachProduct.id === action.payload) {
          state.totalProducts += 1;
          return { ...eachProduct, quantity: eachProduct.quantity + 1 };
        }
        return eachProduct;
      });
    },
    decreaseQuantity: (state, action) => {
      const selectedItem = state.selectedProducts.find(
        (eachProduct) => eachProduct.id === action.payload
      );
      if (selectedItem.quantity !== 1) {
        selectedItem.quantity -= 1;
        return;
      }
      state.selectedProducts = state.selectedProducts.filter(
        (eachProduct) => eachProduct.id !== action.payload
      );
      state.totalProducts -= 1;
    },
    calculateTotalPrice: (state) => {
      state.totalPrice = state.selectedProducts.reduce(
        (current, accumulator) => {
          return current + accumulator.price * accumulator.quantity;
        },
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        const { data, product } = action.payload;
        if (data?.response === "Success") {
          const selectedItem = state.selectedProducts.find(
            (eachProduct) => eachProduct.id === product.id
          );
          if (!selectedItem) {
            state.selectedProducts.push({
              ...action.payload.product,
              quantity: 1,
            });
            state.totalProducts += 1;
            return;
          }
          selectedItem.quantity += 1;
          state.totalProducts += 1;
        }
        state.loading = false;
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const { setCartVisibility, increaseQuantity, decreaseQuantity, calculateTotalPrice } =
  cartSlice.actions;
