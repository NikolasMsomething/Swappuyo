import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { giveCodeToSwappuyoApi } from "../../actions";
import { Redirect } from "react-router-dom";
import { clearAuth } from "../../actions";
import { clearAuthToken, clearRefreshToken } from "../../local-storage";
import { FaValueAbsolute } from "react-icons/fa";

class RedditTokenRedirectPage extends Component {
	componentDidMount() {
		const values = queryString.parse(this.props.location.search);
		if (!values.error) {
			return this.props.dispatch(giveCodeToSwappuyoApi(values.code));
		}
	}

	render() {
		const values = queryString.parse(this.props.location.search);
		if (this.props.refreshToken) {
			return <Redirect to={"/home"} />;
		}
		if (values.error) {
			const clear = async () => {
				await this.props.dispatch(clearAuth());
				await clearAuthToken();
				await clearRefreshToken();
			};
			clear();
		}

		if (!this.props.authToken) {
			return <Redirect to={"/"} />;
		}

		return <div />;
	}
}

function mapStateToProps(state) {
	return {
		redditTokenType: state.loginReducer.redditTokenType,
		accessToken: state.loginReducer.accessToken,
		refreshToken: state.loginReducer.refreshToken,
		authToken: state.loginReducer.authToken
	};
}

export default connect(mapStateToProps)(RedditTokenRedirectPage);
