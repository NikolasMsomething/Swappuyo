import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { getFromRedditHardwareSwap, storeAuthInfo } from "../actions";
import {
	loadAuthToken,
	saveAuthToken,
	clearAuthToken,
	loadRefreshToken,
	saveRefreshToken,
	clearRefreshToken
} from "../local-storage";
import TradeDetails from "./TradeDetails";
import { Redirect, Route, Link } from "react-router-dom";

class Home extends Component {
	componentDidMount() {
		if (this.props.refreshToken) {
			let refreshToken = this.props.refreshToken;
			this.props.dispatch(getFromRedditHardwareSwap(refreshToken));
			saveAuthToken(this.props.authToken);
		}
	}

	render() {
		if (this.props.refreshToken === undefined && this.props.authToken) {
			return (
				<div>
					<a href="https://www.reddit.com/api/v1/authorize?client_id=jMNgm9tZ6e0Kig&response_type=code&state=SwappuyoReddit&redirect_uri=http://localhost:3000/RedditTokenRedirect&duration=permanent&scope=privatemessages,read,submit,save,subscribe,edit">
						AUTHORIZE
					</a>
				</div>
			);
		}
		if (!this.props.authToken) {
			return <Redirect to="/login" />;
		}
		return (
			<React.Fragment>
				<Header />
				<div>
					<h1>Home Page</h1>
					<ul>
						<TradeDetails />
					</ul>
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	console.log(state);
	return {
		items: state.itemsReducer.items,
		authToken: state.loginReducer.authToken,
		refreshToken: state.loginReducer.refreshToken
	};
}

export default connect(mapStateToProps)(Home);
