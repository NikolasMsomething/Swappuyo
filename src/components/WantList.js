import React, { Component } from "react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
	getWantTradeFromSwappuyoApi,
	getWantTradeToSwappuyoApiSuccess,
	storeAuthInfo
} from "../actions/index";
import {
	loadAuthToken,
	saveAuthToken,
	clearAuthToken,
	loadRefreshToken,
	saveRefreshToken,
	clearRefreshToken
} from "../local-storage";

class WantList extends Component {
	componentWillMount() {
		let authToken = loadAuthToken();
		console.log(authToken);
		storeAuthInfo(authToken, this.props.dispatch);
		let refreshToken = loadRefreshToken();
		saveRefreshToken(refreshToken);
	}

	componentDidMount() {
		console.log(this.props.authToken);
		this.props.dispatch(getWantTradeFromSwappuyoApi(this.props.authToken));
	}

	render() {
		return (
			<React.Fragment>
				<Header />
				<div>
					<h1>Want List</h1>
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	console.log(state);
	return {
		wantListItems: state.wantListReducer.wantListItems,
		items: state.itemsReducer.items,
		authToken: state.loginReducer.authToken,
		refreshToken: state.loginReducer.refreshToken
	};
}

export default connect(mapStateToProps)(WantList);
