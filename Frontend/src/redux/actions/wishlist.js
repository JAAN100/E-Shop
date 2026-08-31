

export const addToWishlist = (data) => async (dispatch, getState) => {
    dispatch({
        type: "AddToWishlistRequest",
        payload: data,
    });
    localStorage.setItem("wishlist", JSON.stringify(getState().wishlist.wishlist));
    return data;
}

export const removeFromWishlist = (data) => async (dispatch, getState) => {
    dispatch({
        type: "RemoveFromWishlistRequest",
        payload: data._id,
    });
    localStorage.setItem("wishlist", JSON.stringify(getState().wishlist.wishlist));
    return data;
}