import * as types from "./actionType";
import axios from "axios";

const getEvents = (events) => ({
    type: types.GET_EVENTS,
    payload: events
});

export const loadEvents = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}`).then((resp) => {
            dispatch(getEvents(resp.date))
        })
    }
}