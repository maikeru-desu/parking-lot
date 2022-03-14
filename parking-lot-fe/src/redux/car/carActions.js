import * as types from "./carActionTypes";
import { loadParkingSlots } from '../parkingSlot/parkingSlotActions';
import axios from "axios";

const getCars = (cars) => ({
    type: types.GET_CARS,
    payload: cars
});

const carDeleted = () => ({
    type: types.DELETE_CAR
});

const carAdded = () => ({
    type: types.ADD_CAR
});

const carFetched = (car) => ({
    type: types.GET_CAR,
    payload: car,
});

const filteredCars = (cars) => ({
    type: types.FILTER_CARS,
    payload: cars
});

const carUpdated = () => ({
    type: types.UPDATE_CAR
});

const carPark = () => ({
    type: types.PARK_CAR
});

const carpUnpark = () => ({
    type: types.UNPARK_CAR
});

export const loadCars = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/cars`).then((resp) => {
            // console.log("resp", resp);
            dispatch(getCars(resp.data));
        })
        .catch((error) => console.log(error));
    };
};

export const deleteCar = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/cars/${id}/park`).then((resp) => {
            dispatch(carDeleted());
            dispatch(loadCars());
        })
        .catch((error) => console.log(error));
    };
};

export const addCar = (user) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}`, user).then((resp) => {
            dispatch(carAdded());
            dispatch(loadCars());
        })
        .catch((error) => console.log(error));
    };
};

export const getCar = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/${id}`).then((resp) => {
            dispatch(carFetched(resp.data));
        })
        .catch((error) => console.log(error));
    };
};

export const updateCar = (user, id) => {
    return function (dispatch) {
        axios.put(`${process.env.REACT_APP_API}/${id}`, user).then((resp) => {
            dispatch(carUpdated());
        })
        .catch((error) => console.log(error));
    };
};

export const filterCars = (params) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}${params}`).then((resp) => {
            dispatch(filteredCars(resp.data));
        })
        .catch((error) => console.log(error));
    };
};

export const parkCar = (entryPoint, id) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}/cars/${id}/park`, entryPoint).then((resp) => {
            dispatch(carPark());
            dispatch(loadCars());
            dispatch(loadParkingSlots());
        })
        .catch((error) => console.log(error));
    };
};

export const unparkCar = (id) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}/cars/${id}/unpark`).then((resp) => {
            alert(`Parking Charge: ${resp.data.charge}`)
            dispatch(carpUnpark());
            dispatch(loadCars());
            dispatch(loadParkingSlots());
        })
        .catch((error) => console.log(error));
    };
};
