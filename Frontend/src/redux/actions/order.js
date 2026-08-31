import axios from "axios";

export const GetAllOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetAllOrderForUserRequest",
    });
    const { data } = await axios.get("/api/order/get-all-orders", {
      withCredentials: true,
    });

    dispatch({
      type: "GetAllOrderForUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "GetAllOrderForUserFail",
      payload: error.response.data.message,
    });
  }
};
