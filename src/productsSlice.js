import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch Products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://fake-store-api.mock.beeceptor.com/api/products"
    );
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    updateProduct(state, action) {
      const index = state.items.findIndex(
        (product) => product.product_id === action.payload.product_id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct(state, action) {
      state.items = state.items.filter(
        (product) => product.product_id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
