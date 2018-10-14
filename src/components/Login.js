import React from "react";
import "./styles/Login.css";
import { NavLink } from "react-router-dom";

const Login = () => {
	return (
		<div className="MasterFormContainer">
			<h1 className="SwappuyoLoginTitle">Swappuyo</h1>
			<form className="LoginForm">
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
};

export default Login;
