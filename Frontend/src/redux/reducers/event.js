import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isLoading: true,
}

export const eventReducer = createReducer(initialState , (builder)=>{
    builder
        .addCase("EventCreateRequest" , (state , action)=>{
            state.isLoading = true;
        })
        .addCase("EventCreateSuccess" , (state , action)=>{
            state.isLoading = false,
            state.event = action.payload;
            state.success = true;
        })
        .addCase("EventCreateFail" , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;
            state.success = false;
        })
        .addCase("GetAllEventsForShopRequest" , (state , action)=>{
            state.isLoading = true;
        })
        .addCase("GetAllEventsForShopSuccess" , (state , action)=>{            
            state.isLoading = false,
            state.events = action.payload;
        })
        .addCase("GetAllEventsForShopFail" , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;   
        })
        .addCase("GetAllEventsRequest" , (state , action)=>{
            state.isLoading = true;
        })
        .addCase("GetAllEventsSuccess" , (state , action)=>{
            state.isLoading = false,
            state.allEvents = action.payload;
            
        })
        .addCase("GetAllEventsFail" , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase("ClearErrors" , (state)=>{
            state.error = null;
        })
        .addCase("EventCreateReset" , (state)=>{
            state.success = false;
        })
        .addCase("DeleteEventRequest" , (state , action)=>{
            state.isLoading = true;
    })
        .addCase("DeleteEventSuccess" , (state , action)=>{
            state.isLoading = false,
            state.message = action.payload;
        })
        .addCase("DeleteEventFail" , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;
            state.deleteSuccess = false;
        })
        
})