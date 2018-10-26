import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";
import { storeRefreshToken, storeAuthInfo } from "../actions";
import { loadAuthToken, loadRefreshToken } from "../local-storage";

const store = createStore(reducers, applyMiddleware(thunk));

const authToken = loadAuthToken();
const refreshToken = loadRefreshToken();

//SET TOKENS FROM LOCAL STORAGE IN HERE!!!

if (authToken) {
	storeAuthInfo(authToken, store.dispatch);
}

//hacky way to prevent string undefined loading into refresh token
if (refreshToken && refreshToken !== "undefined") {
	store.dispatch(storeRefreshToken(refreshToken));
}
export default store;
