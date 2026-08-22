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
        .addCase("GetAllProductsForShopRequest" , (state , action)=>{
            state.isLoading = true;
        })
        .addCase("GetAllProductsForShopSuccess" , (state , action)=>{            
            state.isLoading = false,
            state.products = action.payload;
        })
        .addCase("GetAllProductsForShopFail" , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;   
        })
        .addCase("GetAllProductsRequest" , (state , action)=>{
            state.isLoading = true;
        })
        .addCase("GetAllProductsSuccess" , (state , action)=>{            
            state.isLoading = false,
            state.allProducts = action.payload;
        })
        .addCase("GetAllProductsFail" , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;   
        })
        .addCase("ClearErrors" , (state)=>{
            state.error = null;
        })
        .addCase("ProductCreateReset" , (state)=>{
            state.success = false;
        })
        .addCase("DeleteProductRequest" , (state , action)=>{
            state.isLoading = true;
        })
        .addCase("DeleteProductSuccess" , (state , action)=>{
            state.isLoading = false,
            state.message = action.payload;
        })
        .addCase("DeleteProductFail" , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
})