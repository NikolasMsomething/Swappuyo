import {
	SET_AUTH_TOKEN,
	AUTH_SUCCESS,
	AUTH_ERROR,
	CLEAR_AUTH,
	STORE_REDDIT_TOKENS,
	STORE_ACCESS_TOKEN,
	LANDING_TOGGLE,
	STORE_OLD_TIME
} from "../actions";

const initialState = {
	accessExpireTime: undefined,
	authToken: undefined,
	user: undefined,
	loading: false,
	error: null,
	accessToken: undefined,
	expiresIn: undefined,
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
				expiresIn: action.value.expires_in
			});
		}
		case STORE_ACCESS_TOKEN: {
			return Object.assign({}, state, {
				accessToken: action.value
			});
		}
		case LANDING_TOGGLE: {
			return Object.assign({}, state, {
				landingToggle: action.value
			});
		}
		case STORE_OLD_TIME: {
			return Object.assign({}, state, {
				accessExpireTime: action.value
			});
		}

		default:
			return state;
	}
};
