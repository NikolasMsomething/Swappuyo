export const loadAuthToken = () => {
	return localStorage.getItem("authToken");
};

export const saveAuthToken = authToken => {
	try {
		localStorage.setItem("authToken", authToken);
	} catch (e) {
		console.log(e);
	}
};

export const clearAuthToken = () => {
	try {
		localStorage.removeItem("authToken");
	} catch (e) {}
};

export const clearRefreshToken = () => {
	try {
		localStorage.removeItem("refreshToken");
	} catch (e) {
		console.log(e);
	}
};

export const loadRefreshToken = () => {
	return localStorage.getItem("refreshToken");
};

export const saveRefreshToken = refreshToken => {
	try {
		localStorage.setItem("refreshToken", refreshToken);
	} catch (e) {
		console.log(e);
	}
};

export const storeExpireTimeToNow = time => {
	try {
		localStorage.setItem("accessExpireTime", time);
	} catch (e) {
		console.log(e);
	}
};

export const loadExpiringTime = () => {
	try {
		console.log("happened");
		return localStorage.getItem("accessExpireTime");
	} catch (e) {
		console.log(e);
	}
};
