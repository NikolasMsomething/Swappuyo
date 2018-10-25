const initialState = {
	items: [],
	loading: false,
	redditAuthorized: false,
	redditToken: undefined
};

export const itemsReducer = (state = initialState, action) => {
	switch (action.type) {
		case "REDDIT_TO_STORE": {
			return Object.assign({}, state, {
				items: [...action.value]
			});
		}
		case "HANDLE_TRADE_EXPAND": {
			return Object.assign({}, state, {
				items: state.items.map(item => {
					// let string = ""
					// let strArr = item.split(' ')
					// for(let i = 0; i < strArr.length; i++) {
					// 	if(strArr[i] === '(')
					// }
					if (item.itemId === action.value) {
						item.expanded = !item.expanded;
						return item;
					}
					return item;
				})
			});
		}
		default:
			return state;
	}
};
