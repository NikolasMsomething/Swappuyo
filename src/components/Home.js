import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import { getFromRedditHardwareSwap } from "../actions";
import TradeDetails from "./TradeDetails";

class Home extends Component {
	componentDidMount() {
		this.props.dispatch(getFromRedditHardwareSwap());
	}

	render() {
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
		items: state.itemsReducer.items
	};
}

export default connect(mapStateToProps)(Home);
