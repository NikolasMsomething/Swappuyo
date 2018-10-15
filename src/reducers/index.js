import { combineReducers } from "redux";
import { itemsReducer } from "./itemsReducer";
import { registerReducer } from "./registerReducer";
const rootReducer = combineReducers({
	itemsReducer,
	registerReducer
});

export default rootReducer;
