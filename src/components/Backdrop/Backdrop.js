import React from "react";
import "./Backdrop.css";
import { connect } from "react-redux";
import { toggleSideDrawer } from "../../actions";

const BackDrop = props => (
	<div
		onClick={e => {
			e.preventDefault();
			props.dispatch(toggleSideDrawer());
		}}
		className="backdrop"
	/>
);

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(BackDrop);
