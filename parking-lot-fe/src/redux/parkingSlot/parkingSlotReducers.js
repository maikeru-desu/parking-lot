import * as types from "./parkingSlotActionTypes";

const initialState = {
    parkingSlots: [],
    parkingSlot: {},
    loading: true
}

const parkingSlotReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PARKINGSLOTS:
        case types.FILTER_PARKINGSLOTS:
            return {
                ...state,
                parkingSlots: action.payload,
                loading: false,
            };
        case types.DELETE_PARKINGSLOT:
        case types.ADD_PARKINGSLOT:
        case types.UPDATE_PARKINGSLOT:
            return {
                ...state,
                loading: false,
            }
        case types.GET_PARKINGSLOT:
            return {
                ...state,
                parkingSlot: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default parkingSlotReducers;