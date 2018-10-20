import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function WantedItem(props) {
	if (!props.authToken) {
		return <Redirect to="/login" />;
	}

	return (
		<React.Fragment>
			{props.wantListItems.map(item => {
				return (
					<React.Fragment>
						<h2>{item.title}</h2>
						<h3>{item.author}</h3>
						<a href={item.url}>{item.url}</a>
					</React.Fragment>
				);
			})}
		</React.Fragment>
	);
}

function mapStateToProps(state) {
	console.log(state);
	return {
		wantListItems: state.wantListReducer.wantListItems,
		authToken: state.loginReducer.authToken
	};
}

export default connect(mapStateToProps)(WantedItem);
