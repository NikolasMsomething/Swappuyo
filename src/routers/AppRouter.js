import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import TradeHub from "../components/TradeHub";
import WantList from "../components/WantList";
import Contact from "../components/Contact";
import Register from "../components/Register";
import RedditTokenRedirectPage from "../components/RedditTokenRedirectPage";
import Header from "../components/Header";
import SideDrawer from "../components/SideDrawer";
import Backdrop from "../components/Backdrop/Backdrop.js";
import { connect } from "react-redux";

class AppRouter extends Component {
	state = {
		sideDrawerOpen: false
	};

	drawerToggleClickHandler = () => {
		this.setState(prevState => {
			return { sideDrawerOpen: !prevState.sideDrawerOpen };
		});
	};

	render() {
		let sideDrawer = null;
		let backdrop;

		if (this.props.sideDrawerOpen) {
			sideDrawer = <SideDrawer />;
			backdrop = <Backdrop />;
		}
		return (
			<BrowserRouter>
				<React.Fragment>
					<Header />
					{sideDrawer}
					{backdrop}
					<Switch>
						<Route path="/login" component={Login} exact={true} />
						<Route path="/register" component={Register} exact={true} />
						<Route path="/home" component={Home} exact={true} />
						<Route path="/trade-hub" component={TradeHub} exact={true} />
						<Route path="/want-list" component={WantList} exact={true} />
						<Route path="/contact" component={Contact} exact={true} />
						{/* <Route component={NotFound} /> */}
						<Route
							path="/RedditTokenRedirect"
							component={RedditTokenRedirectPage}
							exact={true}
						/>
						<Route path="/" component={Login} />
					</Switch>
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

function mapStateToProps(state) {
	return {
		sideDrawerOpen: state.sideDrawerReducer.sideDrawerOpen
	};
}

export default connect(mapStateToProps)(AppRouter);
