import {combineReducers} from "redux";
import eventReducers from "./eventReducers";
import carReducers from "./car/carReducers";
import parkingSlotReducers from "./parkingSlot/parkingSlotReducers";

const rootReducer = combineReducers({
    events: eventReducers,
    cars: carReducers,
    parkingSlots: parkingSlotReducers
});

export default rootReducer;