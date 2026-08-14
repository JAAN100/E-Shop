import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
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
});