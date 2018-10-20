import { normalizeResponseErrors } from "./utils";
import { saveAuthToken, saveRefreshToken } from "../local-storage";
import jwtDecode from "jwt-decode";
import { API_BASE_URL } from "../config";

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
	return fetch(`${API_BASE_URL}/user`, {
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

export const storeAuthInfo = (authToken, dispatch) => {
	const decodedToken = jwtDecode(authToken);
	console.log(authToken);
	dispatch(setAuthToken(authToken));
	dispatch(authSuccess(decodedToken.user));
	saveAuthToken(authToken);
};

export const postToSwapuyoLoginAction = (username, password) => dispatch => {
	return fetch(`${API_BASE_URL}/login`, {
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

export const RedditItemToStore = value => {
	return {
		type: "REDDIT_TO_STORE",
		value
	};
};

//CALL TO OUR API WHICH CALLS TO REDDIT API USING OUR REFRESH TOKEN!! CRUCIAL STRUCTURE
export const getFromRedditHardwareSwap = refreshToken => dispatch => {
	console.log(refreshToken);
	return fetch(`${API_BASE_URL}/hardwareswap?refreshToken=${refreshToken}`)
		.then(res => normalizeResponseErrors(res))
		.then(results => results.json())
		.then(results => {
			console.log(results);
			let twentyFiveResults = results;
			let arr = [];
			twentyFiveResults.forEach((item, index) => {
				if (index !== 1 && index !== 0) {
					arr.push({
						itemId: item.id,
						itemUrl: item.url,
						itemTitle: item.title,
						itemAuthor: item.author,
						content: item.selftext_html,
						expanded: false
					});
				}
			});
			console.log(arr);
			dispatch(RedditItemToStore(arr));
		})
		.catch(err => {
			console.log(err);
		});
};

export const getFromSubRedditMarkdown = (
	refreshToken,
	subreddit
) => dispatch => {
	console.log(refreshToken);
	return fetch(`${API_BASE_URL}/${subreddit}?refreshToken=${refreshToken}`)
		.then(res => normalizeResponseErrors(res))
		.then(results => results.json())
		.then(results => {
			console.log(results);
			let twentyFiveResults = results;
			let arr = [];
			twentyFiveResults.forEach((item, index) => {
				if (index !== 1 && index !== 0) {
					arr.push({
						itemId: item.id,
						itemUrl: item.url,
						itemTitle: item.title,
						itemAuthor: item.author,
						content: item.selftext_html,
						expanded: false
					});
				}
			});
			console.log(arr);
			dispatch(RedditItemToStore(arr));
		})
		.catch(err => {
			console.log(err);
		});
};

//RedditTokenRedirectActions

// export const GetRefreshTokenFromReddit = code => dispatch => {
// 	const client_id = "jMNgm9tZ6e0Kig";
// 	const client_secret = "qVBQ3qeJfe6NzYCMwY8aDh2oCoI";
// 	console.log(btoa(`${client_id}:${client_secret}`));
// 	// const body = `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/RedditTokenRedirect`;

// 	return fetch("https://www.reddit.com/api/v1/access_token", {
// 		method: "POST", // or 'PUT',
// 		mode: "no-cors",
// 		headers: {
// 			Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
// 			"Content-Type": "application/x-www-form-urlencoded"
// 		},
// 		body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/RedditTokenRedirect`
// 	})
// 		.then(res => normalizeResponseErrors(res))
// 		.then(res => {
// 			console.log(res);
// 			let gabe = res.json();
// 			console.log(gabe);
// 			return res.json();
// 		})
// 		.then(response => {
// 			console.log(response);
// 		})
// 		.catch(err => console.log(err));
// };

export const STORE_REDDIT_TOKENS = "STORE_REDDIT_TOKENS";
export const storeRedditTokens = value => {
	return {
		type: STORE_REDDIT_TOKENS,
		value
	};
};

export const giveCodeToSwappuyoApi = code => dispatch => {
	console.log(btoa("jMNgm9tZ6e0Kig:qVBQ3qeJfe6NzYCMwY8aDh2oCoI"));

	console.log(code);
	return fetch(`${API_BASE_URL}/code`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			code
		})
	})
		.then(res => {
			return res.json();
		})
		.then(data => {
			console.log(data);
			dispatch(storeRedditTokens(data));
			saveRefreshToken(data.refresh_token);
		})
		.catch(err => {
			console.log(err);
		});
};
export const STORE_REFRESH_TOKEN = "STORE_REFRESH_TOKEN";
export const storeRefreshToken = value => {
	return {
		type: STORE_REFRESH_TOKEN,
		value
	};
};
// export const postWantTradeToReduxStore = (val) => {

// }

export const postWantTradeToSwappuyoApiRequest = value => {
	return {
		type: "POST_TRADE_REQUEST",
		value
	};
};

export const postWantTradeToSwappuyoApiSuccess = value => {
	return {
		type: "POST_TRADE_SUCCESS",
		value
	};
};
export const postWantTradeToSwappuyoApi = (
	title,
	url,
	author,
	authToken
) => dispatch => {
	return fetch(`${API_BASE_URL}/wishlist`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + authToken
		},
		body: JSON.stringify({
			title: title,
			url: url,
			author: author
		})
	})
		.then(res => {
			return res.json();
		})
		.then(data => {
			console.log(data);
		})
		.catch(err => {
			console.log(err);
		});
};
export const GET_TRADE_SUCCESS = "GET_TRADE_SUCCESS";
export const getWantTradeFromSwappuyoApiSuccess = value => {
	return {
		type: GET_TRADE_SUCCESS,
		value
	};
};

export const getWantTradeFromSwappuyoApi = authToken => dispatch => {
	return fetch(`${API_BASE_URL}/wishlist`, {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + authToken
		}
	})
		.then(res => {
			return res.json();
		})
		.then(data => {
			dispatch(getWantTradeFromSwappuyoApiSuccess(data));
		})
		.catch(err => {
			console.log(err);
		});
};

//RedditTokenRedirectActions

// TRADE DETAILS ACTIONS HOME PAGE

//WANTLIST PAGE

//WANTLIST PAGE
