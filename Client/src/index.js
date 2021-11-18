import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "assets/scss/material-kit-react.scss";
import LandingPage from "views/LandingPage/LandingPage.js";
import Login from "views/LoginPage/Login";
import Signup from "views/LoginPage/SignUp";
import Create from "views/CreatePage/Create";
import Modify from "views/CreatePage/Modify";
import Catalogue from "views/CataloguePage/Catalogue"
import AdPage from "views/AdPage/AdPage"
import AddAnnonce from "views/AdPage/AddAnnonce";
var hist = createBrowserHistory();



ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/creer" component={Create} />
      <Route path="/deposer" component={AddAnnonce} />
      <Route path="/modifier" component={Modify} />
      <Route path="/annonces" component={AdPage} />
      <Route path="/catalogue" component={Catalogue} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
