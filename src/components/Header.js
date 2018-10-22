import React from "react";
import { NavLink } from "react-router-dom";
import DrawerToggleButton from "./DrawerToggleButton";
import "./styles/navbar.css";

const Header = () => {
	return (
		<header>
			<div>
				<DrawerToggleButton />
			</div>
			<div className="toolbar__logo">Swappuyo</div>
			<div className="spacer" />
			<div className="toolbar_navigation-items">
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
			</div>
		</header>
	);
};

export default Header;
