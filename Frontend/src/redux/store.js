    import { configureStore} from '@reduxjs/toolkit';
    import {userReducer} from './reducers/user.js';
    import { shopReducer } from './reducers/shop.js';
    const store = configureStore({
    reducer: {
        user: userReducer,
        seller: shopReducer
    },
    });

    export default store;