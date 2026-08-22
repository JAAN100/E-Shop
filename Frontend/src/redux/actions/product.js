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


// Get All products


export const getAllProductsForShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "GetAllProductsForShopRequest",
    });
    
    const { data } = await axios.get(`/api/product/get-all-products/${id}`, {
      withCredentials: true,
    });
    
    dispatch({
      type: "GetAllProductsForShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "GetAllProductsForShopFail",
      payload: error.response.data.error,
    });
  }
}

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetAllProductsRequest",
    });
    const { data } = await axios.get("/api/product/get-products", {
      withCredentials: true,
    });
    
    dispatch({
      type: "GetAllProductsSuccess",
      payload: data.allProducts,
    });
  } catch (error) {
    dispatch({
      type: "GetAllProductsFail",
      payload: error.response.data.error,
    });
  }
}


// Delete a product 
export const deleteProduct = (id) => async (dispatch) => {  
  try {
    dispatch({
      type: "DeleteProductRequest",
    });
    const { data } = await axios.delete(`/api/product/delete-product/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "DeleteProductSuccess",
      payload: data.message,
    }); 
  } catch (error) {
    dispatch({
      type: "DeleteProductFail",
      payload: error.response.data.error,
    });
  }
}