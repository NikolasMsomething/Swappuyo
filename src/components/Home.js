import React, { Component } from "react";
import { connect } from "react-redux";
import { getFromRedditHardwareSwap } from "../actions";
import SearchComponent from "./HomeSubComponents/searchComponent";
import TradeDetails from "./HomeSubComponents/TradeDetails";
import { Redirect } from "react-router-dom";
import { clientId, redirectURI } from "../config";
import { Route } from "react-router-dom";

class Home extends Component {
	//WARNING! To be deprecated in React v17. Use componentDidMount instead.

	componentDidMount() {
		if (this.props.refreshToken) {
			let refreshToken = this.props.refreshToken;
			this.props.dispatch(getFromRedditHardwareSwap(refreshToken));
		}
	}

	render() {
		if (this.props.refreshToken === undefined && this.props.authToken) {
			return (
				<div>
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
		refreshToken: state.loginReducer.refreshToken
	};
}

export default connect(mapStateToProps)(Home);
