import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};
export const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadShopSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.shop = action.payload;
    })
    .addCase("LoadShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.shop = null;
    })
    .addCase("ResetShop", (state) => {
      state.isSeller = false;
      state.isLoading = false;
      state.shop = null;
    })
    .addCase("UpdateShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("UpdateShopSuccess", (state, action) => {
      state.isLoading = false;
      state.shop = action.payload;
      state.message = "Shop updated successfully";
    })
    .addCase("UpdateShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessages", (state) => {
      state.message = null;
    });
});
