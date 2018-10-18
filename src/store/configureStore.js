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

if (refreshToken) {
	store.dispatch(storeRefreshToken(refreshToken));
	console.log(refreshToken);
}
export default store;
