export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LoadUserRequest" });
        const res = await fetch("/api/user/getuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to load user");
        }

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error.message,
        });
    }
};