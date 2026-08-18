import axios from "axios";

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "ProductCreateRequest",
    });
    const { data } = await axios.post("/api/product/create-product", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: "ProductCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "ProductCreateFail",
      payload: error.response.data.error,
    });
  }
};
