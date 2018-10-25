import {
	SET_AUTH_TOKEN,
	AUTH_SUCCESS,
	AUTH_ERROR,
	CLEAR_AUTH,
	STORE_REDDIT_TOKENS,
	STORE_REFRESH_TOKEN,
	LANDING_TOGGLE
} from "../actions";

const initialState = {
	authToken: undefined,
	user: undefined,
	loading: false,
	error: null,
	redditTokenType: undefined,
	accessToken: undefined,
	refreshToken: undefined,
	landingToggle: false
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
		case STORE_REDDIT_TOKENS: {
			return Object.assign({}, state, {
				redditTokenType: action.value.token_type,
				accessToken: action.value.access_token,
				refreshToken: action.value.refresh_token
			});
		}
		case STORE_REFRESH_TOKEN: {
			return Object.assign({}, state, {
				refreshToken: action.value
			});
		}
		case LANDING_TOGGLE: {
			return Object.assign({}, state, {
				landingToggle: action.value
			});
		}

		default:
			return state;
	}
};
