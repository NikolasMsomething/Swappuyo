const initialState = {
	items: [],
	loading: false
};

export const itemsReducer = (state = initialState, action) => {
	switch (action.type) {
		case "HS_TO_STORE": {
			return Object.assign({}, state, {
				items: [...action.value]
			});
		}
		case "HANDLE_TRADE_EXPAND": {
			return Object.assign({}, state, {
				items: state.items.map(item => {
					if (item.itemId === action.value) {
						item.expanded = !item.expanded;
						console.log("hello");
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
