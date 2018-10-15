import React from "react";
import "./styles/Register.css";
import { postToSwapuyoRegisterAction } from "../actions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Register = props => {
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

					return Promise.all([
						props.dispatch(
							postToSwapuyoRegisterAction(name, email, username, password)
						)
					]).then(() => {
						if (props.didRegister) {
							props.history.push({
								pathname: "/login"
							});
						}
					});
				}}
			>
				<label className="NameLabel" for="username">
					Full Name:
				</label>
				<input type="text" name="name" />
				<label className="EmailLabel" for="email">
					Email:
				</label>
				<input type="text" name="email" />
				<label className="UsernameLabel" for="username">
					Username:
				</label>
				<input type="text" name="username" />
				<label className="PasswordLabel" for="password">
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
		didRegister: state.registerReducer.didRegister
	};
}

export default connect(mapStateToProps)(Register);
