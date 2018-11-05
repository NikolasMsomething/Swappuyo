import { normalizeResponseErrors } from "./utils";
import {
	saveAuthToken,
	saveAccessToken,
	storeExpireTimeToNow
} from "../local-storage";
import jwtDecode from "jwt-decode";
import { API_BASE_URL } from "../config";
import swal from "sweetalert";

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
			return dispatch(postToSwapuyoLoginAction(username, password));
		})
		.catch(error => {
			let err = error.message || error.error.details[0].message;

			swal(err);
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
			swal(err);
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
export const getFromRedditHardwareSwap = accessToken => dispatch => {
	let newAccessToken;

	if (accessToken) {
		newAccessToken = accessToken.replace("+", "%2B");
	}

	return fetch(`${API_BASE_URL}/api/hardwareswap?accessToken=${newAccessToken}`)
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
			swal(err);
		});
};

export const getFromSubRedditMarkdown = (
	accessToken,
	subreddit,
	redditFilter
) => dispatch => {
	let newAccessToken;

	if (accessToken) {
		newAccessToken = accessToken.replace("+", "%2B");
	}

	return fetch(
		`${API_BASE_URL}/api/${subreddit}?accessToken=${newAccessToken}&redditFilter=${redditFilter}`
	)
		.then(res => normalizeResponseErrors(res))
		.then(results => results.json())
		.then(results => {
			let fortyResults;

			if (redditFilter === "new" || redditFilter === "rising") {
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
			if (subreddit === "gameswap") {
				fortyResults = results;
				let arr = [];
				fortyResults.forEach((item, index) => {
					if (index !== 0) {
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
			} else {
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
			}
		})
		.catch(err => {
			swal(err);
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

export const STORE_OLD_TIME = "STORE_OLD_TIME";
export const storeOldTime = value => {
	return {
		type: STORE_OLD_TIME,
		value
	};
};

export const giveCodeToSwappuyoApi = (code, authToken) => dispatch => {
	return fetch(`${API_BASE_URL}/api/code`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + authToken
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
			if (data.expires_in) {
				let timeRightNow = Date.now();
				console.log(timeRightNow);
				storeExpireTimeToNow(timeRightNow); //local
				dispatch(storeOldTime(timeRightNow)); //redux
			}
			dispatch(storeRedditTokens(data));
			console.log(data, "DATE AFTER CODE");
			if (data.access_token !== undefined) {
				saveAccessToken(data.access_token);
			}
		})
		.catch(err => {
			swal(err);
		});
};

export const giveRefreshTokenToSwappuyoApi = authToken => dispatch => {
	return fetch(`${API_BASE_URL}/api/redditrefresh`, {
		method: "POST",
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
			console.log(data);
			if (data.expires_in) {
				let timeRightNow = Date.now();
				console.log(timeRightNow);
				storeExpireTimeToNow(timeRightNow); //local
				dispatch(storeOldTime(timeRightNow)); //redux
			}
			if (data.access_token && data.access_token !== "undefined") {
				dispatch(storeRedditTokens(data));
			}
		})
		.catch(err => {
			swal(err);
		});
};

export const STORE_ACCESS_TOKEN = "STORE_ACCESS_TOKEN";
export const storeAccessToken = value => {
	return {
		type: STORE_ACCESS_TOKEN,
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
		swal("Item Deleted!");
		try {
			await dispatch(getWantTradeFromSwappuyoApi(authToken));
		} catch (err) {
			swal(err);
		}
	} catch (error) {
		swal(error);
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
			swal("Item Saved!");
		})
		.catch(err => {
			swal(err);
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
			swal(err);
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
