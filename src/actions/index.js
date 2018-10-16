import { normalizeResponseErrors } from "./utils";

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
export const postToSwapuyoLoginSuccess = value => {
	return {
		type: "HANDLE_TOKEN",
		value
	};
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
			dispatch(postToSwapuyoLoginSuccess(res));
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
			let twentyFiveResults = results;
			console.log(twentyFiveResults);
			let arr = [];
			twentyFiveResults.forEach((item, index) => {
				if (index !== 1 && index !== 0) {
					arr.push({
						itemId: item.id,
						itemUrl: item.url,
						itemTitle: item.title,
						itemAuthor: item.author,
						content: item.selftext,
						expanded: false
					});
				}
			});
			console.log(arr);
			dispatch(hardWareSwapItemToStore(arr));
		});
};

// TRADE DETAILS ACTIONS HOME PAGE

//WANTLIST PAGE

//WANTLIST PAGE
