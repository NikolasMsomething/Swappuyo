import React from "react";
import "./styles/Register.css";
import { postToSwapuyoRegisterAction } from "../actions";

import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

const Register = props => {
	if (props.authToken) {
		return <Redirect to="/home" />;
	}

	// if (props.didRegister) {
	// 	return <Redirect to="/login" />;
	// }

	return (
		<React.Fragment>
			<h1 className="SwappuyoLoginTitle">
				{" "}
				<img
					alt="logo"
					src="https://media.discordapp.net/attachments/492714183725678615/502705464820105225/black-swappuyo.png"
				/>
			</h1>
			<div className="MasterFormContainer">
				<form
					className="RegisterForm"
					onSubmit={e => {
						e.preventDefault();
						let name = e.target.name.value;
						let email = e.target.email.value;
						let username = e.target.username.value;
						let password = e.target.password.value;

						return props.dispatch(
							postToSwapuyoRegisterAction(name, email, username, password)
						); //RENDER OFF THE DIDREGISTER STATE BEING TRUE AT THE TOP IN AN IF STATEMENT
					}}
				>
					<label className="NameLabel" htmlFor="username">
						Full Name:
					</label>
					<input placeholder="Master" type="text" name="name" />
					<label className="EmailLabel" htmlFor="email">
						Email:
					</label>
					<input placeholder="Roshi" type="text" name="email" />
					<label className="UsernameLabel" htmlFor="username">
						Username:
					</label>
					<input placeholder="King" type="text" name="username" />
					<label className="PasswordLabel" htmlFor="password">
						Password:
					</label>
					<input placeholder="Piccolo" type="password" name="password" />
					<input
						id="SignUpBtn"
						className="SignUpBtn"
						type="submit"
						value="Sign Up!"
					/>
					<NavLink
						className="AlreadyHaveAccountLink"
						to="/login"
						activeclassname="is-active"
					>
						Already have an account?
					</NavLink>
				</form>
			</div>
		</React.Fragment>
	);
};

function mapStateToProps(state) {
	return {
		authToken: state.loginReducer.authToken,
		didRegister: state.registerReducer.didRegister,
		errorMessage: state.registerReducer.errorMessage
	};
}

export default connect(mapStateToProps)(Register);
