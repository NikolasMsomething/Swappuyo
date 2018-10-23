import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { getFromRedditHardwareSwap } from "../actions";
import SearchComponent from "./searchComponent";
import TradeDetails from "./TradeDetails";
import { Redirect } from "react-router-dom";

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
					<a href="https://www.reddit.com/api/v1/authorize?client_id=07yxX4MKHTyX3A&response_type=code&state=SwappuyoReddit&redirect_uri=https://swappuyo-client.herokuapp.com/RedditTokenRedirect&duration=permanent&scope=privatemessages,read,submit,save,subscribe,edit">
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
		refreshToken: state.loginReducer.refreshToken
	};
}

export default connect(mapStateToProps)(Home);
