import React from "react";
import "../styles/DrawerToggleButton.css";
import { connect } from "react-redux";
import { toggleSideDrawer } from "../../actions";

const DrawerToggleButton = props => (
	<button
		onClick={e => {
			e.preventDefault();
			props.dispatch(toggleSideDrawer());
		}}
		className="toggle-button"
	>
		<div className="toggle-button__line" />
		<div className="toggle-button__line" />
		<div className="toggle-button__line" />
	</button>
);

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(DrawerToggleButton);
