import axios from "axios";

export const GetCoupounCode = () => async (dispatch) => {
    try {
        dispatch({
            type: "GetCoupounCodeRequest"
        });

        const response = await axios.get("/api/coupoun-code/get-coupoun-code", {
            withCredentials: true
        });
        const data = await response.data.coupounCodes;    
        dispatch({
            type: "GetCoupounCodeSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "GetCoupounCodeFail",
            payload: error.message
        });
    }
};

export const DeleteCoupounCode = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "DeleteCouponCodeRequest"
        });
        const response = await axios.delete(`/api/coupoun-code/delete-coupoun-code/${id}`, {
            withCredentials: true
        });
        const data = await response.data.message;        
        dispatch({
            type: "DeleteCouponCodeSuccess",
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: "DeleteCouponCodeFail",
            payload: error.message
        });
    }
}