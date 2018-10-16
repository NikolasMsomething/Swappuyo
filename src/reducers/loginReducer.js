const initialState = {
	loggedIn: false,
	authToken: undefined,
	user: undefined
};

export const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case "REGISTER_USER": {
			return Object.assign({}, state, {
				didRegister: !state.didRegister
			});
		}
		case "HANDLE_TOKEN": {
			return Object.assign({}, state, {
				loggedIn: !state.loggedIn,
				authToken: action.value.jwtToken,
				user: action.value.user
			});
		}
		default:
			return state;
	}
};
