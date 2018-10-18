import React from "react";
import "./styles/Register.css";
import { postToSwapuyoRegisterAction } from "../actions";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Register = props => {
	if (props.didRegister) {
		return <Redirect to="/login" />;
	}
	return (
		<React.Fragment>
			<h1 className="SwappuyoLoginTitle">Swappuyo</h1>
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
				<input type="text" name="name" />
				<label className="EmailLabel" htmlFor="email">
					Email:
				</label>
				<input type="text" name="email" />
				<label className="UsernameLabel" htmlFor="username">
					Username:
				</label>
				<input type="text" name="username" />
				<label className="PasswordLabel" htmlFor="password">
					Password:
				</label>
				<input type="text" name="password" />
				<input
					id="SignUpBtn"
					className="SignUpBtn"
					type="submit"
					value="Sign Up!"
				/>
			</form>
		</React.Fragment>
	);
};

function mapStateToProps(state) {
	console.log(state);
	return {
		didRegister: state.registerReducer.didRegister,
		errorMessage: state.registerReducer.errorMessage
	};
}

export default connect(mapStateToProps)(Register);
