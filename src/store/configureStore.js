import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";
import { storeRefreshToken, storeAuthInfo, storeOldTime } from "../actions";
import {
	loadAuthToken,
	loadRefreshToken,
	loadExpiringTime
} from "../local-storage";

const store = createStore(reducers, applyMiddleware(thunk));

const authToken = loadAuthToken();
const refreshToken = loadRefreshToken();
const accessExpireTime = loadExpiringTime();
//SET TOKENS FROM LOCAL STORAGE IN HERE!!!
console.log(accessExpireTime);
if (accessExpireTime) {
	console.log("here");
	store.dispatch(storeOldTime(accessExpireTime));
}

if (authToken) {
	storeAuthInfo(authToken, store.dispatch);
}

if (refreshToken) {
	store.dispatch(storeRefreshToken(refreshToken));
}
export default store;
