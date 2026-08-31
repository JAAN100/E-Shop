import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.js";
import { shopReducer } from "./reducers/shop.js";
import { productReducer } from "./reducers/product.js";
import { eventReducer } from "./reducers/event.js";
import { coupounCodeReducer } from "./reducers/coupons.js";
import { cartReducer } from "./reducers/cart.js";
import { wishlistReducer } from "./reducers/wishlist.js";
import { orderReducer } from "./reducers/order.js";
const store = configureStore({
  reducer: {
    user: userReducer,
    seller: shopReducer,
    products: productReducer,
    events: eventReducer,
    coupounCodes: coupounCodeReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});

export default store;
