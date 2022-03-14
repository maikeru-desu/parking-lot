import * as types from "./actionType";

const getEvents = (events) => ({
    type: types.GET_EVENTS,
    payload: events
});