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
	return fetch(`${API_BASE_URL}/api/user`, {
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
			let err = error.message || error.error.details[0].message;

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
	dispatch(setAuthToken(authToken));
	dispatch(authSuccess(decodedToken.user));
	saveAuthToken(authToken);
};

export const postToSwapuyoLoginAction = (username, password) => dispatch => {
	return fetch(`${API_BASE_URL}/api/login`, {
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
			let jwtToken = res.jwtToken;
			storeAuthInfo(jwtToken, dispatch);
		})
		.catch(error => {
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
	return fetch(`${API_BASE_URL}/api/hardwareswap?refreshToken=${refreshToken}`)
		.then(res => normalizeResponseErrors(res))
		.then(results => results.json())
		.then(results => {
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
			dispatch(RedditItemToStore(arr));
		})
		.catch(err => {
			alert(err);
		});
};

export const getFromSubRedditMarkdown = (
	refreshToken,
	subreddit,
	redditFilter
) => dispatch => {
	return fetch(
		`${API_BASE_URL}/api/${subreddit}?refreshToken=${refreshToken}&redditFilter=${redditFilter}`
	)
		.then(res => normalizeResponseErrors(res))
		.then(results => results.json())
		.then(results => {
			let fortyResults;

			if (subreddit === "new" || subreddit === "rising") {
				fortyResults = results;
				let arr = [];
				fortyResults.forEach((item, index) => {
					arr.push({
						itemId: item.id,
						itemUrl: item.url,
						itemTitle: item.title,
						itemAuthor: item.author,
						content: item.selftext_html,
						expanded: false
					});
				});
				dispatch(RedditItemToStore(arr));
			}
			fortyResults = results;
			let arr = [];
			fortyResults.forEach((item, index) => {
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
			dispatch(RedditItemToStore(arr));
		})
		.catch(err => {
			alert(err);
		});
};

//REDDIT TOKEN ACTIONS //REDDIT TOKEN ACTIONS //REDDIT TOKEN ACTIONS //REDDIT TOKEN ACTIONS

export const STORE_REDDIT_TOKENS = "STORE_REDDIT_TOKENS";
export const storeRedditTokens = value => {
	return {
		type: STORE_REDDIT_TOKENS,
		value
	};
};

export const giveCodeToSwappuyoApi = code => dispatch => {
	return fetch(`${API_BASE_URL}/api/code`, {
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
			dispatch(storeRedditTokens(data));
			saveRefreshToken(data.refresh_token);
		})
		.catch(err => {
			alert(err);
		});
};
export const STORE_REFRESH_TOKEN = "STORE_REFRESH_TOKEN";
export const storeRefreshToken = value => {
	return {
		type: STORE_REFRESH_TOKEN,
		value
	};
};

//REDDIT TOKEN ACTIONS //REDDIT TOKEN ACTIONS //REDDIT TOKEN ACTIONS

// POST WANTS TO SWAPPUYO ACTIONS // POST WANTS TO SWAPPUYO ACTIONS // POST WANTS TO SWAPPUYO ACTIONS

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

export const deleteWantTradeFromSwappuyoApi = (
	authToken,
	itemId
) => async dispatch => {
	try {
		await fetch(`${API_BASE_URL}/api/wishlist/${itemId}`, {
			method: "DELETE",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + authToken
			}
		});
		alert("Item Deleted!");
		try {
			await dispatch(getWantTradeFromSwappuyoApi(authToken));
		} catch (err) {
			alert(err);
		}
	} catch (error) {
		alert(error);
	}
}; //testing async await here!

export const postWantTradeToSwappuyoApi = (
	title,
	url,
	author,
	authToken
) => dispatch => {
	return fetch(`${API_BASE_URL}/api/wishlist`, {
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
			alert("Item Saved!");
		})
		.catch(err => {
			alert(err);
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
	return fetch(`${API_BASE_URL}/api/wishlist`, {
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
			alert(err);
		});
};

// POST WANTS TO SWAPPUYO ACTIONS// POST WANTS TO SWAPPUYO ACTIONS// POST WANTS TO SWAPPUYO ACTIONS

//SIDE DRAWER  ACTIONS
export const TOGGLE_SIDEDRAWER = "TOGGLE_SIDEDRAWER";
export const toggleSideDrawer = value => {
	return {
		type: TOGGLE_SIDEDRAWER,
		value
	};
};
//SIDE DRAWER  ACTIONS

// TRADE DETAILS ACTIONS HOME PAGE

//LANDING PAGE
export const LANDING_TOGGLE = "LANDING_TOGGLE";
export const LandingPage = value => {
	return {
		type: LANDING_TOGGLE,
		value
	};
};
//LANDING PAGE
