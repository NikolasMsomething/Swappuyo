import { GET_TRADE_SUCCESS } from "../actions";

const initialState = {
	wantListItems: [],
	loading: false
};

export const wantListReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TRADE_SUCCESS: {
			return Object.assign({}, state, {
				wantListItems: action.value
			});
		}
		default:
			return state;
	}
};
