const register = value => {
	return {
		type: "REGISTER_USER",
		value
	};
};

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

export const getFromRedditApi = () => dispatch => {
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
