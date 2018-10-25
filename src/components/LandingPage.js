import React, { Component } from "react";
import { connect } from "react-redux";

const LandingPage = props => {
	return (
		<div>
			<h1>Trading on Reddit taken seriously</h1>
			<p>
				Reddit can mean a lot of different things to a lot of different people.
				Some people look to it for community, news, or even simple laughs.
				Though to a select few, Reddit is meant for a sole purpose, and that
				purpose is to trade.{" "}
			</p>

			<h2>Introducing Swappuyo</h2>
			<p>
				Swappuyo is a fast and efficient way to view and save Reddit trades on
				the go or at home. It effectively eliminates the incessant need to visit
				the whole Reddit website, when we know all we want to do is trade.
			</p>
			<h3>Getting to startuyod</h3>
			<p>Click here to get started!</p>
		</div>
	);
};

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(LandingPage);
