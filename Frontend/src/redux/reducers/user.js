import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase("ResetUser", (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    }) //Update the User information
    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.message = "User information updated successfully";
    })
    .addCase("updateUserInfoFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updateUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.user = action.payload;
      state.message = "User address updated successfully";
    })
    .addCase("updateUserAddressFail", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })
    .addCase("DeleteUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("DeleteUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.user = action.payload;
      state.message = "User address deleted successfully";
    })
    .addCase("DeleteUserAddressFail", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })
    .addCase("ChangeUserPasswordRequest", (state) => {
      state.passwordLoading = true;
    })
    .addCase("ChangeUserPasswordSuccess", (state, action) => {
      state.passwordLoading = false;
      state.passwordMessage = action.payload;
    })
    .addCase("ChangeUserPasswordFail", (state, action) => {
      state.passwordLoading = false;
      state.passwordError = action.payload;
    });
});
