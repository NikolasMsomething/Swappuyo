import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import TradeHub from "../components/TradeHub";
import WantList from "../components/WantList";
import Contact from "../components/Contact";
import NotFound from "../components/NotFound";
import Register from "../components/Register";

const AppRouter = () => (
	<BrowserRouter>
		<React.Fragment>
			<Switch>
				<Route path="/login" component={Login} exact={true} />
				<Route path="/register" component={Register} exact={true} />
				<Route path="/home" component={Home} exact={true} />
				<Route path="/trade-hub" component={TradeHub} exact={true} />
				<Route path="/want-list" component={WantList} exact={true} />
				<Route path="/contact" component={Contact} exact={true} />
				<Route component={NotFound} />
			</Switch>
		</React.Fragment>
	</BrowserRouter>
);

export default AppRouter;
