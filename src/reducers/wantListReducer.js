const initialState = {
	wantListItems: [],
	loading: false
};

export const wantListReducer = (state = initialState, action) => {
	switch (action.type) {
		case "HS_TO_STORE": {
			return Object.assign({}, state, {
				items: [...action.value]
			});
		}
		case "GET_TRADE_SUCCESS": {
			return Object.assign({}, state, {
				// wantListItems: state.items.map(item => {
				// 	if (item.itemId === action.value) {
				// 		item.expanded = !item.expanded;
				// 		console.log("hello");
				// 		return item;
				// 	}
				// 	return item;
				// })
			});
		}
		default:
			return state;
	}
};
