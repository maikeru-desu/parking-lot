import {combineReducers} from "redux";
import eventsReducers from "./reducer";

const rootReducer = combineReducers({
    events: eventsReducers
});

export default rootReducer;