import * as types from "./actionType";
import axios from "axios";

const getEvents = (events) => ({
    type: types.GET_EVENTS,
    payload: events
});

const eventDeleted = () => ({
    type: types.DELETE_EVENT
});

const eventAdded = () => ({
    type: types.ADD_EVENT
});

const eventFetched = (event) => ({
    type: types.GET_EVENT,
    payload: event,
});

const eventUpdated = () => ({
    type: types.UPDATE_EVENT
});

const filteredEvents = (events) => ({
    type: types.FILTER_EVENTS,
    payload: events
});

export const loadEvents = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}?_sort=date&_order=asc`).then((resp) => {
            // console.log("resp", resp);
            dispatch(getEvents(resp.data));
        })
        .catch((error) => console.log(error));
    };
};

export const deleteEvent = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/${id}`).then((resp) => {
            dispatch(eventDeleted());
            dispatch(loadEvents());
        })
        .catch((error) => console.log(error));
    };
};

export const addEvent = (user) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}`, user).then((resp) => {
            dispatch(eventAdded());
            dispatch(loadEvents());
        })
        .catch((error) => console.log(error));
    };
};

export const getEvent = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/${id}`).then((resp) => {
            dispatch(eventFetched(resp.data));
        })
        .catch (err) {

        } finally{
            
        };
    };
};

export const updateEvent = (user, id) => {
    return function (dispatch) {
        axios.put(`${process.env.REACT_APP_API}/${id}`, user).then((resp) => {
            dispatch(eventUpdated());
        })
        .catch((error) => console.log(error));
    };
};

export const filterEvents = (params) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}${params}`).then((resp) => {
            dispatch(filteredEvents(resp.data));
        })
        .catch((error) => console.log(error));
    };
};
