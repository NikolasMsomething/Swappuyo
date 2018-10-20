import React from "react";
import { NavLink } from "react-router-dom";
import DrawerToggleButton from "./DrawerToggleButton";
import "./styles/navbar.css";

const Header = () => (
	<header>
		<div>
			<DrawerToggleButton />
		</div>
		<div className="toolbar__logo">Swappuyo</div>
		<div className="spacer" />
		<NavLink to="/home" activeClassName="is-active" exact={true}>
			Home
		</NavLink>
		<NavLink to="/trade-hub" activeClassName="is-active">
			TradeHub
		</NavLink>
		<NavLink to="/want-list" activeClassName="is-active">
			Want List
		</NavLink>
		<NavLink to="/contact" activeClassName="is-active">
			Contact
		</NavLink>
	</header>
);

export default Header;
