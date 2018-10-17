import { normalizeResponseErrors } from "./utils";
import { saveAuthToken, loadAuthToken, clearAuthToken } from "../local-storage";
import jwtDecode from "jwt-decode";

const register = value => {
	return {
		type: "REGISTER_USER",
		value
	};
};

// REGISTER ACTIONS PAGE
export const postToSwapuyoRegisterSuccess = value => {
	return {
		type: "REGISTER_USER",
		value
	};
};

export const postToSwapuyoRegisterRequest = value => {};

export const postToSwapuyoRegisterError = value => {
	return {
		type: "REGISTER_ERROR",
		value
	};
};

export const postToSwapuyoRegisterAction = (
	name,
	email,
	username,
	password
) => dispatch => {
	return fetch("http://localhost:8080/api/user", {
		method: "POST", // or 'PUT',
		mode: "cors",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: name,
			email: email,
			username: username,
			password: password
		}) // body data type must match "Content-Type" header
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => {
			return res.json();
		})

		.then(() => {
			return dispatch(postToSwapuyoRegisterSuccess());
		})
		.catch(error => {
			console.log(error);
			let err = error.message || error.error.details[0].message;
			// if (error.message) {
			// 	console.error(error.message);
			// }
			// if (error.error) {
			// 	alert(error.error);
			// }
			alert(err);
		});
};

// REGISTER ACTIONS PAGE

// LOGIN ACTIONS PAGE
export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const setAuthToken = authToken => ({
	type: SET_AUTH_TOKEN,
	authToken
});
export const CLEAR_AUTH = "CLEAR_AUTH";
export const clearAuth = () => ({
	type: CLEAR_AUTH
});

export const AUTH_REQUEST = "AUTH_REQUEST";
export const authRequest = () => ({
	type: AUTH_REQUEST
});

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const authSuccess = currentUser => ({
	type: AUTH_SUCCESS,
	currentUser
});

export const AUTH_ERROR = "AUTH_ERROR";
export const authError = error => ({
	type: AUTH_ERROR,
	error
});

const storeAuthInfo = (authToken, dispatch) => {
	const decodedToken = jwtDecode(authToken);
	console.log(authToken);
	dispatch(setAuthToken(authToken));
	dispatch(authSuccess(decodedToken.user));
	saveAuthToken(authToken);
};

export const postToSwapuyoLoginAction = (username, password) => dispatch => {
	return fetch("http://localhost:8080/api/login", {
		method: "POST", // or 'PUT',
		mode: "cors",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: username,
			password: password
		}) // body data type must match "Content-Type" header
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => {
			return res.json();
		})
		.then(res => {
			console.log(res.jwtToken);
			let jwtToken = res.jwtToken;
			storeAuthInfo(jwtToken, dispatch);
		})
		.catch(error => {
			console.log(error);
			let err = error.message || error.error.details[0].message;
			// if (error.message) {
			// 	console.error(error.message);
			// }
			// if (error.error) {
			// 	alert(error.error);
			// }
			alert(err);
		});
};

//LOGIN ACTIONS PAGE
export const loginPageRegisterReset = value => {
	return {
		type: "LOGIN_PAGE_RESET",
		value
	};
};

// TRADE DETAILS ACTIONS HOME PAGE

export const handleTradeExpandAction = value => {
	return {
		type: "HANDLE_TRADE_EXPAND",
		value
	};
};

export const hardWareSwapItemToStore = value => {
	return {
		type: "HS_TO_STORE",
		value
	};
};

export const getFromRedditHardwareSwap = () => dispatch => {
	return fetch("http://localhost:8080/api/hardwareswap")
		.then(results => results.json())
		.then(results => {
			console.log(results);
			let twentyFiveResults = results;
			// let arr = [];
			// twentyFiveResults.forEach((item, index) => {
			// 	if (index !== 1 && index !== 0) {
			// 		arr.push({
			// 			itemId: item.id,
			// 			itemUrl: item.url,
			// 			itemTitle: item.title,
			// 			itemAuthor: item.author,
			// 			content: item.selftext,
			// 			expanded: false
			// 		});
			// 	}
			// });
			// console.log(arr);
			// dispatch(hardWareSwapItemToStore(arr));
		});
};

//RedditTokenRedirectActions
export const GetRefreshTokenFromReddit = code => dispatch => {
	const client_id = "jMNgm9tZ6e0Kig";
	const client_secret = "qVBQ3qeJfe6NzYCMwY8aDh2oCoI";
	const obj = {
		code: code,
		grant_type: "authorization_code",
		redirect_uri: "http://localhost:3000/RedditTokenRedirect"
	};
	const body = `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/RedditTokenRedirect`;

	return fetch("https://www.reddit.com/api/v1/access_token", {
		// Authorization: "jMNgm9tZ6e0Kig:qVBQ3qeJfe6NzYCMwY8aDh2oCoI",
		method: "POST", // or 'PUT',
		mode: "no-cors",
		headers: {
			Authorization:
				"Basic" + btoa("jMNgm9tZ6e0Kig:qVBQ3qeJfe6NzYCMwY8aDh2oCoI"),
			"Content-Type": "application/x-www-form-urlencoded"
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		// headers: { "Content-Type": "application/x-www-form-urlencoded" },

		// client_id: "jMNgm9tZ6e0Kig",
		// client_secret: "qVBQ3qeJfe6NzYCMwY8aDh2oCoI",
		body
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => {
			console.log(res);
			let gabe = JSON.stringify(res);
			console.log(gabe);
			return res.json();
		})
		.then(response => {
			console.log(response);
		})
		.catch(err => console.log(err));
};
//RedditTokenRedirectActions

// TRADE DETAILS ACTIONS HOME PAGE

//WANTLIST PAGE

//WANTLIST PAGE
