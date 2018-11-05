export const loadAuthToken = () => {
	return localStorage.getItem("authToken");
};

export const saveAuthToken = authToken => {
	try {
		return localStorage.setItem("authToken", authToken);
	} catch (e) {
		console.log(e);
	}
};

export const clearAuthToken = () => {
	try {
		return localStorage.removeItem("authToken");
	} catch (e) {}
};

export const clearAccessToken = () => {
	try {
		return localStorage.removeItem("accessToken");
	} catch (e) {
		console.log(e);
	}
};

export const loadAccessToken = () => {
	return localStorage.getItem("accessToken");
};

export const saveAccessToken = accessToken => {
	try {
		return localStorage.setItem("accessToken", accessToken);
	} catch (e) {
		console.log(e);
	}
};

export const storeExpireTimeToNow = time => {
	try {
		return localStorage.setItem("accessExpireTime", time);
	} catch (e) {
		console.log(e);
	}
};

export const loadExpiringTime = () => {
	try {
		return localStorage.getItem("accessExpireTime");
	} catch (e) {
		console.log(e);
	}
};

export const clearTimeToken = () => {
	try {
		return localStorage.removeItem("accessExpireTime");
	} catch (e) {
		console.log(e);
	}
};
