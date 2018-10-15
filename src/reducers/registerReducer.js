const initialState = {
	didRegister: false
};

export const registerReducer = (state = initialState, action) => {
	switch (action.type) {
		case "REGISTER_USER": {
			return Object.assign({}, state, {
				didRegister: !state.didRegister
			});
		}
		default:
			return state;
	}
};
