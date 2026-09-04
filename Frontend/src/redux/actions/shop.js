import axios from "axios";
export const updateShopInfo =
  (
    shopEmail,
    shopPassword,
    phoneNumber,
    shopName,
    description,
    shopAddress,
    zipCode,
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: "UpdateShopRequest" });
      const { data } = await axios.put(
        "/api/shop/update-shop",
        {
          shopName: shopName,
          shopEmail: shopEmail,
          phoneNumber: phoneNumber,
          shopPassword: shopPassword,
          description: description,
          shopAddress: shopAddress,
          zipCode: zipCode,
        },
        { withCredentials: true },
      );
      dispatch({ type: "UpdateShopSuccess", payload: data.shop });
    } catch (error) {
      dispatch({ type: "UpdateShopFail", payload: error.message });
    }
  };
