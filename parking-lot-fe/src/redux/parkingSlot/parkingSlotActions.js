import * as types from "./parkingSlotActionTypes";
import axios from "axios";

const getParkingSlots = (parkingSlots) => ({
    type: types.GET_PARKINGSLOTS,
    payload: parkingSlots
});

const parkingSlotDeleted = () => ({
    type: types.DELETE_PARKINGSLOT
});

const parkingSlotAdded = () => ({
    type: types.ADD_PARKINGSLOT
});

const parkingSlotFetched = (parkingSlot) => ({
    type: types.GET_PARKINGSLOT,
    payload: parkingSlot,
});

const parkingSlotUpdated = () => ({
    type: types.UPDATE_PARKINGSLOT
});

const filteredParkingSlots = (parkingSlots) => ({
    type: types.FILTER_PARKINGSLOTS,
    payload: parkingSlots
});

export const loadParkingSlots = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/parking-slots`).then((resp) => {
            // console.log("resp", resp);
            dispatch(getParkingSlots(resp.data));
        })
        .catch((error) => console.log(error));
    };
};

export const deleteParkingSlot = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/${id}`).then((resp) => {
            dispatch(parkingSlotDeleted());
            dispatch(loadParkingSlots());
        })
        .catch((error) => console.log(error));
    };
};

export const addParkingSlot = (user) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}`, user).then((resp) => {
            dispatch(parkingSlotAdded());
            dispatch(loadParkingSlots());
        })
        .catch((error) => console.log(error));
    };
};

export const getParkingSlot = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/${id}`).then((resp) => {
            dispatch(parkingSlotFetched(resp.data));
        })
        .catch((error) => console.log(error));
    };
};

export const updateParkingSlot = (user, id) => {
    return function (dispatch) {
        axios.put(`${process.env.REACT_APP_API}/${id}`, user).then((resp) => {
            dispatch(parkingSlotUpdated());
        })
        .catch((error) => console.log(error));
    };
};

export const filterParkingSlots = (params) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}${params}`).then((resp) => {
            dispatch(filteredParkingSlots(resp.data));
        })
        .catch((error) => console.log(error));
    };
};
