import axios from "axios";
// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`/api/user/get-user`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
    return;
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const resetUser = () => (dispatch) => {
  dispatch({
    type: "ResetUser",
  });
};

export const loadShop = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadShopRequest",
    });
    const { data } = await axios.get(`/api/shop/get-shop`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadShopSuccess",
      payload: data.shop,
    });
    return;
  } catch (error) {
    dispatch({
      type: "LoadShopFail",
      payload: error.response.data.message,
    });
  }
};

export const userUpdateInfo =
  (email, password, phoneNumber, fullName) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });
      const { data } = await axios.put(
        `/api/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          fullName,
        },
        {
          withCredentials: true,
        },
      );
      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFail",
        payload: error.response.data.message,
      });
    }
  };

export const userUpdateAddress =
  (address1, address2, city, country, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });
      const { data } = await axios.patch(
        `/api/user/update-user-address`,
        {
          address1,
          address2,
          city,
          country,
          zipCode,
          addressType,
        },
        {
          withCredentials: true,
        },
      );
      dispatch({
        type: "updateUserAddressSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFail",
        payload: error.response.data.message,
      });
    }
  };

export const userDeleteAddress = (addressID) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteUserAddressRequest",
    });
    const { data } = await axios.delete(
      `/api/user/delete-user-address/${addressID}`,
      {
        withCredentials: true,
      },
    );
    dispatch({
      type: "DeleteUserAddressSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "DeleteUserAddressFail",
      payload: error.response.data.message,
    });
  }
};

export const ChangeUserPassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "ChangeUserPasswordRequest",
      });
      const { data } = await axios.put(
        `/api/user/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true,
        },
      );
      dispatch({
        type: "ChangeUserPasswordSuccess",
        payload: data.passwordMessage,
      });
    } catch (error) {
      dispatch({
        type: "ChangeUserPasswordFail",
        payload: error.response.data.message,
      });
    }
  };
