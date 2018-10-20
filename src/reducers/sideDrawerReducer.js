import { TOGGLE_SIDEDRAWER } from "../actions";

const initialState = {
	sideDrawerOpen: false
};

const sideDrawerReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_SIDEDRAWER: {
			return Object.assign({}, state, {
				sideDrawerOpen: !state.sideDrawerOpen
			});
		}
		default:
			return state;
	}
};

export { sideDrawerReducer };
