import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("GetAllOrderForUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("GetAllOrderForUserSuccess", (state, action) => {
      ((state.isLoading = false), (state.orders = action.payload));
    })
    .addCase("GetAllOrderForUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("ClearErrors", (state) => {
      state.error = null;
    });
});
