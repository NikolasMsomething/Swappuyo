import React, { Component } from "react";
import { connect } from "react-redux";
import { getFromRedditHardwareSwap, storeOldTime } from "../actions";
import SearchComponent from "./HomeSubComponents/searchComponent";
import TradeDetails from "./HomeSubComponents/TradeDetails";
import { Redirect } from "react-router-dom";
import { clientId, redirectURI } from "../config";
import { Route } from "react-router-dom";
import "./styles/Home.css";
import { loadExpiringTime } from "../local-storage";

class Home extends Component {
	//WARNING! To be deprecated in React v17. Use componentDidMount instead.

	componentDidMount() {
		if (this.props.accessExpireTime) {
			this.props.dispatch(storeOldTime(this.props.accessExpireTime));
		}

		if (this.props.refreshToken) {
			let refreshToken = this.props.refreshToken;
			this.props.dispatch(getFromRedditHardwareSwap(refreshToken));
		}

		console.log(Date.now());
	}

	render() {
		if (this.props.refreshToken === undefined && this.props.authToken) {
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
	console.log(state);
	return {
		items: state.itemsReducer.items,
		authToken: state.loginReducer.authToken,
		refreshToken: state.loginReducer.refreshToken,
		accessExpireTime: state.loginReducer.accessExpireTime
	};
}

export default connect(mapStateToProps)(Home);
