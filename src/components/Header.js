import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
	<header>
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
