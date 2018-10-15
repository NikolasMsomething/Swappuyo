const register = value => {
	return {
		type: "REGISTER_USER",
		value
	};
};

// REGISTER ACTIONS PAGE
export const postToSwapuyoRegisterSyncAction = value => {
	return {
		type: "REGISTER_USER",
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
		.then(res => {
			return res.json();
		})
		.then(response => {
			console.log(response);
			if (!response.error) {
				return dispatch(postToSwapuyoRegisterSyncAction());
			}
			if (response.error) {
				alert("There was a validation error! Check your fields!");
			}
		})
		.catch(err => alert(err));
};

// REGISTER ACTIONS PAGE

// LOGIN ACTIONS PAGE

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
	return fetch("https://www.reddit.com/r/hardwareswap.json")
		.then(results => results.json())
		.then(results => {
			let twentyFiveResults = results.data.children;
			console.log(twentyFiveResults);
			let arr = [];
			twentyFiveResults.forEach((item, index) => {
				if (index !== 1 && index !== 0) {
					arr.push({
						itemId: item.data.id,
						itemUrl: item.data.url,
						itemTitle: item.data.title,
						itemAuthor: item.data.author,
						content: item.data.selftext,
						expanded: false
					});
				}
			});
			console.log(arr);
			dispatch(hardWareSwapItemToStore(arr));
		});
};

// TRADE DETAILS ACTIONS HOME PAGE
