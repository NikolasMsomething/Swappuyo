import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { setAuthToken, GetRefreshTokenFromReddit } from "../actions";
import { loadAuthToken, saveAuthToken, clearAuthToken } from "../local-storage";

class RedditTokenRedirectPage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		let authToken = loadAuthToken();
		console.log(authToken);
		this.props.dispatch(setAuthToken(authToken));
	}

	componentDidMount() {
		console.log(this.props);
		const values = queryString.parse(this.props.location.search);
		console.log(values.code);
		return this.props.dispatch(GetRefreshTokenFromReddit(values.code));
	}

	render() {
		return <div />;
	}
}

function mapStateToProps(state) {
	console.log(state);
	return state;
}

export default connect(mapStateToProps)(RedditTokenRedirectPage);
