import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { getFromRedditHardwareSwap } from "../actions";
import TradeDetails from "./TradeDetails";
import { Redirect, Route, Link } from "react-router-dom";

class Home extends Component {
	componentDidMount() {
		this.props.dispatch(getFromRedditHardwareSwap());
	}

	render() {
		// if (!this.props.redditAuthorized && this.props.loggedIn) {
		// 	return (
		// 		<div>
		// 			<a href="https://www.reddit.com/api/v1/authorize?client_id=jMNgm9tZ6e0Kig&response_type=code&state=SwappuyoReddit&redirect_uri=http://localhost:3000/home&duration=permanent&scope=privatemessages">
		// 				AUTHORIZE
		// 			</a>
		// 		</div>
		// 	);
		// }
		if (!this.props.loggedIn) {
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
		loggedIn: state.loginReducer.loggedIn,
		redditAuthorized: state.itemsReducer.redditAuthorized
	};
}

export default connect(mapStateToProps)(Home);
