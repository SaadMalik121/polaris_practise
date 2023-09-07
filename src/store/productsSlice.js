import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || [],
  productId: parseInt(localStorage.getItem("productId")) || 1,

  // [
  //   {
  //     id: 1,
  //     image: "https://uniworthdress.com/uploads/product/CS2192..jpg",
  //     name: "ABC",
  //     width: "58",
  //     height: "182",
  //     price: 200,
  //     measureUnit: "sheet",
  //     creditValue: 12,
  //     productType: "Regular",
  //     category: "-",
  //     SKU: 10,
  //   },
  // ],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProduct: (state, { payload }) => {
      const productIndex = state.products.findIndex((p) => p.id === payload.id);
      state.products[productIndex] = payload;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    addProduct: (state, { payload }) => {
      state.products.push({ ...payload, id: ++state.productId });
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("productId", JSON.stringify(state.productId));
      console.log(state.productId);
    },
    removeAllProducts: (state) => {
      localStorage.removeItem("products");
      localStorage.removeItem("productId");
      alert("Removed");
    },
    removeProduct: (state, { payload }) => {
      state.products = state.products.filter(
        (product) => product.id !== payload
      );
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
});

export const { updateProduct, addProduct, removeAllProducts, removeProduct } =
  productSlice.actions;

export default productSlice.reducer;
