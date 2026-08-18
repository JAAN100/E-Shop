import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isLoading: true,
}

export const productReducer = createReducer(initialState , (builder)=>{
    builder
        .addCase("ProductCreateRequest" , (state , action)=>{
            state.isLoading = true;
        })
        .addCase("ProductCreateSuccess" , (state , action)=>{
            state.isLoading = false,
            state.product = action.payload;
            state.success = true;
        })
        .addCase("ProductCreateFail" , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        })
        .addCase("ClearErrors" , (state)=>{
            state.error = null;
        })
        .addCase("ProductCreateReset" , (state)=>{
            state.success = false;
        })
})