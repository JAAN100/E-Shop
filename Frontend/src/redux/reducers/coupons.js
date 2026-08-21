import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isLoading: true
}

export const coupounCodeReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("GetCoupounCodeRequest", (state, action) => {
            state.isLoading = true;
        })
        .addCase("GetCoupounCodeSuccess", (state, action) => {
            state.isLoading = false;
            state.coupounCodes = action.payload;          
        })
        .addCase("GetCoupounCodeFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        })
        .addCase("DeleteCouponCodeRequest" , (state, action) => {
            state.isLoading = true;
        })
        .addCase("DeleteCouponCodeSuccess" , (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("DeleteCouponCodeFail" , (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.deleteSuccess = false;
        })
})