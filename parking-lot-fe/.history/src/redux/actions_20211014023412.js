import * as types from "./actionType";
import axios from "axios";

const getEvents = (events) => ({
    type: types.GET_EVENTS,
    payload: events
});

export const loadEvents = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}`).then((resp) => {
            // console.log("resp", resp);
            dispatch(getEvents(resp.data));
        })
        .catch((error) => console.log(error));
    };
};

export const deleteEvent = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}${id}`).then((resp) => {
            // console.log("resp", resp);
            dispatch(getEvents(resp.data));
        })
            .catch((error) => console.log(error));
    };
};