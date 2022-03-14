import * as types from "./actionType";

const initialState = {
    events: [],
    event: {},
    loading: false
}

const eventsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_EVENTS:
            return {
                ...state,
                events: action.paylod
            }
        default:
            return state;
    }
}

export default eventsReducers;