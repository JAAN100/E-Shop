    import { configureStore} from '@reduxjs/toolkit';
    import {userReducer} from './reducers/user.js';
    import { shopReducer } from './reducers/shop.js';
    import { productReducer } from './reducers/product.js';
    import { eventReducer } from './reducers/event.js';
    const store = configureStore({
    reducer: {
        user: userReducer,
        seller: shopReducer,
        products: productReducer,
        events: eventReducer,
    },
    });

    export default store;