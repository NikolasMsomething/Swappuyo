import { combineReducers } from "redux";
import { itemsReducer } from "./itemsReducer";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { wantListReducer } from "./wantListReducer";
import { sideDrawerReducer } from "./sideDrawerReducer";

const rootReducer = combineReducers({
	itemsReducer,
	registerReducer,
	loginReducer,
	wantListReducer,
	sideDrawerReducer
});

export default rootReducer;
