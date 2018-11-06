import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getFromRedditHardwareSwap,
	giveRefreshTokenToSwappuyoApi
} from "../actions";
import SearchComponent from "./HomeSubComponents/searchComponent";
import TradeDetails from "./HomeSubComponents/TradeDetails";
import { Redirect } from "react-router-dom";
import { clientId, redirectURI } from "../config";
import { Route } from "react-router-dom";
import "./styles/Home.css";

class Home extends Component {
	//WARNING! To be deprecated in React v17. Use componentDidMount instead.

	componentDidMount() {
		if (this.props.accessExpireTime) {
			let currentTime = Date.now();
			let oldTime = Number(this.props.accessExpireTime);
			console.log(currentTime - oldTime);
			let timeCheck = currentTime - oldTime;
			if (Math.abs(timeCheck) >= 2700000) {
				this.props.dispatch(
					giveRefreshTokenToSwappuyoApi(this.props.authToken)
				);
			}
		}

		if (this.props.accessToken) {
			let accessToken = this.props.accessToken;
			this.props.dispatch(getFromRedditHardwareSwap(accessToken));
		}
	}

	componentDidUpdate() {
		if (this.props.accessExpireTime) {
			let currentTime = Date.now();
			let oldTime = Number(this.props.accessExpireTime);
			console.log(currentTime - oldTime);
			let timeCheck = currentTime - oldTime;
			if (Math.abs(timeCheck) >= 2700000) {
				this.props.dispatch(
					giveRefreshTokenToSwappuyoApi(this.props.authToken)
				);
			}
		}
	}

	render() {
		if (this.props.accessToken === undefined && this.props.authToken) {
			return (
				<div className="hide">
					<Route
						path="/"
						component={() =>
							(window.location = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=SwappuyoReddit&redirect_uri=${redirectURI}&duration=permanent&scope=privatemessages,read,submit,save,subscribe,edit`)
						}
					/>
				</div>
			);
		}
		if (!this.props.authToken) {
			return <Redirect to="/login" />;
		}
		return (
			<React.Fragment>
				<div>
					<SearchComponent />
					<TradeDetails />
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		items: state.itemsReducer.items,
		authToken: state.loginReducer.authToken,
		accessToken: state.loginReducer.accessToken,
		accessExpireTime: state.loginReducer.accessExpireTime
	};
}

export default connect(mapStateToProps)(Home);
