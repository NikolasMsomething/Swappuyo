import React, { Component } from "react";
import "./styles/Login.css";
import { NavLink, Redirect } from "react-router-dom";
import { postToSwapuyoLoginAction } from "../actions";
import { connect } from "react-redux";
import {
	postToSwapuyoRegisterAction,
	loginPageRegisterReset
} from "../actions";
// export default class Login extends Component {
//   render() {
// 	return (
// 	  <div>

// 	  </div>
// 	)
//   }
// }

class Login extends Component {
	componentDidMount() {
		this.props.dispatch(loginPageRegisterReset());
	}

	render() {
		if (this.props.authToken) {
			return <Redirect to="/home" />;
		}
		return (
			<div className="MasterFormContainer">
				<h1 className="SwappuyoLoginTitle">Swappuyo</h1>
				<form
					className="LoginForm"
					onSubmit={e => {
						e.preventDefault();

						let username = e.target.username.value;
						let password = e.target.password.value;

						return this.props.dispatch(
							postToSwapuyoLoginAction(username, password)
						); //RENDER OFF THE DIDREGISTER STATE BEING TRUE AT THE TOP IN AN IF STATEMENT
					}}
				>
					{" "}
					<label className="UsernameLabel" htmlFor="username">
						Username:
					</label>
					<input type="text" name="username" placeholder="King" />
					<label className=" PasswordLabel" htmlFor="password">
						Password:
					</label>
					<input placeholder="Piccolo" type="text" name="password" />
					<input
						id="SignInBtn"
						className="SignInBtn"
						type="submit"
						value="Sign In!"
					/>
					<NavLink
						className="DontHaveAccountLink"
						to="/register"
						activeClassName="is-active"
					>
						Don't have an account?
					</NavLink>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	console.log(state);
	return {
		didRegister: state.registerReducer.didRegister,
		authToken: state.loginReducer.authToken
	};
}

export default connect(mapStateToProps)(Login);
