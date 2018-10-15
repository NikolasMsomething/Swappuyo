const initialState = {
	didRegister: false,
	errorMessage: ""
};

export const registerReducer = (state = initialState, action) => {
	switch (action.type) {
		case "REGISTER_USER": {
			return Object.assign({}, state, {
				didRegister: !state.didRegister
			});
		}
		case "REGISTER_ERROR": {
			return Object.assign({}, state, {
				errorMessage: action.value,
				didRegister: false
			});
		}
		case "LOGIN_PAGE_RESET": {
			return Object.assign({}, state, {
				didRegister: false
			});
		}
		default:
			return state;
	}
};
