import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { giveCodeToSwappuyoApi } from "../../actions";
import { Redirect } from "react-router-dom";
import { clearAuth } from "../../actions";
import { clearAuthToken, clearRefreshToken } from "../../local-storage";

class RedditTokenRedirectPage extends Component {
	componentDidMount() {
		const values = queryString.parse(this.props.location.search);

		return this.props.dispatch(giveCodeToSwappuyoApi(values.code));
	}

	render() {
		const values = queryString.parse(this.props.location.search);
		if (this.props.refreshToken) {
			return <Redirect to={"/home"} />;
		}
		if (values.error) {
			this.props.dispatch(clearAuth());
			clearAuthToken();
			clearRefreshToken();

			const clear = async () => {
				await this.props.dispatch(clearAuth());
				clearAuthToken();
				clearRefreshToken();
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
	console.log(state.loginReducer);
	return {
		redditTokenType: state.loginReducer.redditTokenType,
		accessToken: state.loginReducer.accessToken,
		refreshToken: state.loginReducer.refreshToken,
		authToken: state.loginReducer.authToken
	};
}

export default connect(mapStateToProps)(RedditTokenRedirectPage);
