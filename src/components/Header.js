import React from "react";
import { NavLink } from "react-router-dom";
import DrawerToggleButton from "./HeaderSubComponents/DrawerToggleButton";
import "./styles/navbar.css";
import { clearAuthToken } from "../local-storage";

const Header = () => {
	return (
		<header role="Navigation" className="header-bar">
			<div>
				<DrawerToggleButton />
			</div>
			<div className="toolbar__logo">
				<img src="https://images-ext-2.discordapp.net/external/0ncRQU_hih4fnE-P2te0Di-05LFYJT5MfGPNfwrI4sU/https/cdn.discordapp.com/attachments/492714183725678615/502705468217622538/white-swappuyo.png" />
			</div>
			<div className="spacer" />
			<div className="toolbar_navigation-items">
				<ul>
					<li>
						<NavLink
							role="Link"
							className="home-link"
							to="/home"
							activeClassName="is-active"
							exact={true}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							role="Link"
							className="tradehub-link"
							to="/trade-hub"
							activeClassName="is-active"
						>
							TradeHub
						</NavLink>
					</li>
					<li>
						<NavLink
							role="Link"
							className="wantlist-link"
							to="/want-list"
							activeClassName="is-active"
						>
							Want List
						</NavLink>
					</li>
					<li>
						<a
							className="contact-link"
							onClick={e => {
								clearAuthToken();
							}}
							href="/login"
							activeClassName="is-active"
						>
							Sign Out
						</a>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
