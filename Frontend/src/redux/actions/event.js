import axios from "axios";

export const createEvent = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "EventCreateRequest",
    });
    const { data } = await axios.post("/api/event/create-event", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: "EventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "EventCreateFail",
      payload: error.response.data.error,
    });
  }
};

export const getAllEventsForShop = (id) => async (dispatch) => {  
  try {
    dispatch({
      type: "GetAllEventsForShopRequest",
    });
    const { data } = await axios.get(`/api/event/get-all-events/${id}`, {
      withCredentials: true,
    });
    console.log(data);
    
    dispatch({
      type: "GetAllEventsForShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "GetAllEventsForShopFail",
      payload: error.response.data.error,
    });
  }
}

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetAllEventsRequest",
    });
    const { data } = await axios.get("/api/event/get-events", {
      withCredentials: true,
    });
    dispatch({
      type: "GetAllEventsSuccess",
      payload: data.allEvents,
    });
  } catch (error) {
    dispatch({
      type: "GetAllEventsFail",
      payload: error.response.data.error,
    });
  }
}

export const deleteEvent = (id) => async (dispatch) => {
   try {
    dispatch({
      type: "DeleteEventRequest",
    });
    const { data } = await axios.delete(`/api/event/delete-event/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "DeleteEventSuccess",
      payload: data.message,
    }); 
  } catch (error) {
    dispatch({
      type: "DeleteEventFail",
      payload: error.response.data.error,
    });
  }
}