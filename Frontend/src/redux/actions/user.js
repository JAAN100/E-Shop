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
    })
  }
};
export const resetUser = () => (dispatch) => {
  dispatch({
    type: "ResetUser",
  });
};