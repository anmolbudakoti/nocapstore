import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  categories: [],
  filteredProducts: [],
  productDetails: null,
  status: "idle",
  error: null,
};

const API_URL = "https://fakestoreapi.com";

export const fetchProductsAndCategories = createAsyncThunk(
  "products/fetchProductsAndCategories",
  async () => {
    const productsResponse = await axios.get(`${API_URL}/products`);
    const categoriesResponse = await axios.get(
      `${API_URL}/products/categories`,
    );
    return {
      products: productsResponse.data,
      categories: categoriesResponse.data,
    };
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = state.products.filter(
        (product) => product.category === action.payload,
      );
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAndCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAndCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.filteredProducts = action.payload.products;
      })
      .addCase(fetchProductsAndCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilteredProducts, setProductDetails } = productSlice.actions;

export default productSlice.reducer;
