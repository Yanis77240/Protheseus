import React from "react";
import { useContext, useRef } from "react";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/Context";

const Login = () => {
	const history = useHistory();
	const emailRef = useRef();
	const passwordRef = useRef();
	const { user, dispatch, isFetching } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "LOGIN_START" });
		try {
			const res = await axios.post("/users/login", {
				email: emailRef.current.value,
				password: passwordRef.current.value,
			});
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
			history.push("/");
		} catch (err) {
			dispatch({ type: "LOGIN_FAILURE" });
		}
	};
	
	return (
		<div className="login">
			<span className="loginTitle">Login</span>
			<form className="loginForm" onSubmit={handleSubmit}>
				<label>Email</label>
				<input
					type="text"
					className="loginInput"
					placeholder="Enter your email..."
					ref={emailRef}
				/>
				<label>Password</label>
				<input
					type="password"
					className="loginInput"
					placeholder="Enter your password..."
					ref={passwordRef}
				/>
				<button className="loginButton" type="submit" disabled={isFetching}>
					Login
				</button>
			</form>
			<button className="loginRegisterButton">
				<Link className="link" to="/signup">
					Sign Up
				</Link>
			</button>
		</div>
	);
};

export default Login;
