import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";
import { storeAccessToken, storeAuthInfo, storeOldTime } from "../actions";
import {
	loadAuthToken,
	loadAccessToken,
	loadExpiringTime
} from "../local-storage";

const store = createStore(reducers, applyMiddleware(thunk));

const authToken = loadAuthToken();
const accessToken = loadAccessToken();
const accessExpireTime = loadExpiringTime();
//SET TOKENS FROM LOCAL STORAGE IN HERE!!!

if (accessExpireTime) {
	store.dispatch(storeOldTime(accessExpireTime));
}

if (authToken) {
	storeAuthInfo(authToken, store.dispatch);
}

if (accessToken) {
	store.dispatch(storeAccessToken(accessToken));
}
export default store;
