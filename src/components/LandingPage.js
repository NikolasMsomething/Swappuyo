import React from "react";
import { connect } from "react-redux";
import "./styles/LandingPage.css";
import { NavLink, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

const LandingPage = props => {
	if (history.location.pathname === "/") {
		console.log(
			"When the setting sun is sinking and your mind from troubles free. When of missing friends you're thinking, Don't forget to think of me :)"
		);
	}

	if (props.authToken) {
		return <Redirect to="/home" />;
	}

	return (
		<React.Fragment>
			<section className="landing-box-1">
				<h1 className="landing-box-1-h1">Trading on Reddit taken seriously.</h1>
				<p className="landing-infos">
					Reddit can mean a lot of different things to a lot of different
					people. Some people look to it for community, news, or even simple
					laughs. Though to a select few, Reddit is meant for a sole purpose,
					and that purpose is to{" "}
					<em>
						<NavLink className="landing-box-1-tradeword" to="/home">
							trade
						</NavLink>
					</em>
					.
					<NavLink className="get-started-link" to="/register">
						Click here to get started!
					</NavLink>
				</p>
			</section>
			<section className="landing-box-2">
				<h2 className="landing-box-2-h2">
					All your trading sub-reddits in one place
				</h2>
				<div className="landing-box-2-img-box">
					<img alt="img-ex" src="https://i.imgur.com/IRsGVjM.png" />
				</div>
				<p className="landing-infos-2">
					Swappuyo is a fast and efficient way to view and save Reddit trades on
					the go or at home. It effectively eliminates the incessant need to
					visit the whole Reddit website, when all we know we want to do is
					trade.
				</p>
			</section>
		</React.Fragment>
	);
};

function mapStateToProps(state) {
	return {
		authToken: state.loginReducer.authToken
	};
}

export default connect(mapStateToProps)(LandingPage);
