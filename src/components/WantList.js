import React, { Component } from "react";

import { connect } from "react-redux";
import WantedItem from "./WantListSubComponents/WantedItem";
import { getWantTradeFromSwappuyoApi } from "../actions/index";

class WantList extends Component {
	componentDidMount() {
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
	return {
		authToken: state.loginReducer.authToken,
		wantListItems: state.wantListReducer.wantListItems
	};
}

export default connect(mapStateToProps)(WantList);
