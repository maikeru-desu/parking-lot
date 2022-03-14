import * as types from "./actionType";

const initialState = {
    events: [],
    event: {},
    loading: true
}

const eventsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_EVENTS:
        case types.FILTER_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading: false,
            };
        case types.DELETE_EVENT:
        case types.ADD_EVENT:
        case types.UPDATE_EVENT:
            return {
                ...state,
                loading: false,
            }
        case types.GET_EVENT:
        case types.ERROR_EVENT:
            return {
                ...state,
                event: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default eventsReducers;