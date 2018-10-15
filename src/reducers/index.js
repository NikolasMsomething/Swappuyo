import { combineReducers } from "redux";
import { itemsReducer } from "./itemsReducer";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
const rootReducer = combineReducers({
	itemsReducer,
	registerReducer,
	loginReducer
});

export default rootReducer;
