import { combineReducers } from "redux";
import { itemsReducer } from "./itemsReducer";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { wantListReducer } from "./wantListReducer";
const rootReducer = combineReducers({
	itemsReducer,
	registerReducer,
	loginReducer,
	wantListReducer
});

export default rootReducer;
