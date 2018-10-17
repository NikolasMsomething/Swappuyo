import {
	SET_AUTH_TOKEN,
	AUTH_SUCCESS,
	AUTH_ERROR,
	CLEAR_AUTH
} from "../actions";

const initialState = {
	authToken: undefined,
	user: undefined,
	loading: false,
	error: null
};

export const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case "REGISTER_USER": {
			return Object.assign({}, state, {
				didRegister: !state.didRegister
			});
		}
		case SET_AUTH_TOKEN: {
			return Object.assign({}, state, {
				loading: false,
				authToken: action.authToken
			});
		}
		case AUTH_SUCCESS: {
			return Object.assign({}, state, {
				loading: false,
				user: action.currentUser
			});
		}
		case AUTH_ERROR: {
			return Object.assign({}, state, {
				loading: false,
				error: action.error
			});
		}
		case CLEAR_AUTH: {
			return Object.assign({}, state, {
				authToken: null,
				currentUser: null
			});
		}
		default:
			return state;
	}
};
