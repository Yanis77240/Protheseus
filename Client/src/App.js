import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "assets/scss/material-kit-react.scss";
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import LandingPage from "views/LandingPage/LandingPage.js";
import Login from "views/LoginPage/Login";
import Signup from "views/SignupPage/Signup";
import Catalogue from "views/CataloguePage/Catalogue";
import Single from "views/Single/Single";
import ChooseProthese from "views/ChooseProthese/ChooseProthese";
import { Context } from "./context/Context";
import CreateProthese from "views/CreateProthese/CreateProthese";

export default function App() {
	const { user } = useContext(Context);
	return (
		<Router>
			<Header
				color="white"
				brand="Protheseus"
				rightLinks={<HeaderLinks />}
				fixed
				changeColorOnScroll={{
					height: 100,
					color: "white",
				}}
			/>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/choose" component={ChooseProthese} />
				<Route path="/create">{user ? <CreateProthese /> : <Login />}</Route>
				<Route exact path="/protheses" component={Catalogue} />
				<Route path="/protheses/:id" component={Single} />
			</Switch>
		</Router>
	);
}
