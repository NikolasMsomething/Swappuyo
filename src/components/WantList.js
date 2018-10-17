import React from "react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const WantList = props => {
	if (!props.refreshToken) {
		return <Redirect to="/" />;
	}

	return (
		<React.Fragment>
			<Header />
			<div>
				<h1>Want List</h1>
			</div>
		</React.Fragment>
	);
};

function mapStateToProps(state) {
	console.log(state);
	return {
		items: state.itemsReducer.items,
		authToken: state.loginReducer.authToken,
		refreshToken: state.loginReducer.refreshToken
	};
}

export default connect(mapStateToProps)(WantList);
