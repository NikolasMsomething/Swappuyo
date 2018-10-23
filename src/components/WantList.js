import React, { Component } from "react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import WantedItem from "./WantedItem";
import { getWantTradeFromSwappuyoApi } from "../actions/index";

class WantList extends Component {
	componentDidMount() {
		console.log(this.props.authToken);
		this.props.dispatch(getWantTradeFromSwappuyoApi(this.props.authToken));
	}

	render() {
		return (
			<React.Fragment>
				<div>
					<WantedItem />
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	console.log(state);
	return {
		authToken: state.loginReducer.authToken,
		wantListItems: state.wantListReducer.wantListItems
	};
}

export default connect(mapStateToProps)(WantList);
