import * as types from "./carActionTypes";

const initialState = {
    cars: [],
    car: {},
    loading: true
}

const carReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CARS:
        case types.FILTER_CARS:
            return {
                ...state,
                cars: action.payload,
                loading: false,
            };
        case types.DELETE_CAR:
        case types.ADD_CAR:
        case types.UPDATE_CAR:
        case types.PARK_CAR:
        case types.UNPARK_CAR:
            return {
                ...state,
                loading: false,
            }
        case types.GET_CAR:
            return {
                ...state,
                car: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default carReducers;