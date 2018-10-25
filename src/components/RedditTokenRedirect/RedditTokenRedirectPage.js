import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { giveCodeToSwappuyoApi } from "../../actions";
import { Redirect } from "react-router-dom";

class RedditTokenRedirectPage extends Component {
	componentDidMount() {
		const values = queryString.parse(this.props.location.search);

		// this.props.dispatch(GetRefreshTokenFromReddit(values.code));
		return this.props.dispatch(giveCodeToSwappuyoApi(values.code));
	}

	render() {
		if (this.props.refreshToken) {
			return <Redirect to={"/home"} />;
		}
		return <div />;
	}
}

function mapStateToProps(state) {
	return {
		redditTokenType: state.loginReducer.redditTokenType,
		accessToken: state.loginReducer.accessToken,
		refreshToken: state.loginReducer.refreshToken
	};
}

export default connect(mapStateToProps)(RedditTokenRedirectPage);
