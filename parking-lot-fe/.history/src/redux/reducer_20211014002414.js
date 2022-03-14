import * as types from "./actionType";

const initialState = {
    events: [],
    event: {},
    loading: true
}

const eventsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading: false,
            }
        default:
            return state;
    }
}

export default eventsReducers;