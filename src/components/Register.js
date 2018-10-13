import React from "react";
import "./styles/Login.css";

const Register = () => {
	return (
		<React.Fragment>
			<h1 className="SwappuyoLoginTitle">Swappuyo</h1>
			<form className="LoginForm">
				<label className="FullName" for="username">
					Full Name:
				</label>
				<input type="text" name="FullName" />
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

export default Register;
