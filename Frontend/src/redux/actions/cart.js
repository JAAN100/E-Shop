
export const addToCart = (data) => async (dispatch, getState) => {
    dispatch({
        type: "AddToCartRequest",
        payload: data,
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
    return data;
}

export const removeFromCart = (data) => async (dispatch, getState) => {
    dispatch({
        type: "RemoveFromCartRequest",
        payload: data._id,
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cart));
    return data;
}