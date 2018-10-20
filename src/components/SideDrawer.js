import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./styles/SideDrawer.css";
import { toggleSideDrawer } from "../actions";

const SideDrawer = props => (
	<nav className="side-drawer">
		<ul>
			<li>
				<NavLink to="/home" activeClassName="is-active" exact={true}>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink to="/trade-hub" activeClassName="is-active">
					TradeHub
				</NavLink>
			</li>
			<li>
				<NavLink to="/want-list" activeClassName="is-active">
					Want List
				</NavLink>
			</li>
			<li>
				<NavLink to="/contact" activeClassName="is-active">
					Contact
				</NavLink>
			</li>
		</ul>
	</nav>
);

export default SideDrawer;
