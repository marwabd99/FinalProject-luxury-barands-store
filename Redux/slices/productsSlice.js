import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// שליפת מוצרים מהשרת
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
