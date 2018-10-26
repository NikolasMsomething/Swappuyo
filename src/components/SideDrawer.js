import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/SideDrawer.css";
import { connect } from "react-redux";
import { clearAuthToken, clearRefreshToken } from "../local-storage";

const SideDrawer = props => {
	let drawerClasses = ["side-drawer"];

	if (props.sideDrawerOpen) {
		drawerClasses = ["side-drawer open"];
	}

	return (
		<nav className={drawerClasses.join("")}>
			<ul>
				<li>
					<NavLink
						className="home-link"
						to="/home"
						activeclassname="is-active"
						exact={true}
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						className="trade-link"
						to="/trade-hub"
						activeclassname="is-active"
					>
						TradeHub
					</NavLink>
				</li>
				<li>
					<NavLink
						className="wantlist-link"
						to="/want-list"
						activeclassname="is-active"
					>
						Want List
					</NavLink>
				</li>
				<li>
					<a
						onClick={e => {
							clearAuthToken();
							clearRefreshToken();
						}}
						className="contact-link"
						href="/login"
						activeclassname="is-active"
					>
						Sign Out
					</a>
				</li>
			</ul>
		</nav>
	);
};

function mapStateToProps(state) {
	return {
		sideDrawerOpen: state.sideDrawerReducer.sideDrawerOpen,
		authToken: state.loginReducer.authToken,
		refreshToken: state.loginReducer.refreshToken
	};
}

export default connect(mapStateToProps)(SideDrawer);
