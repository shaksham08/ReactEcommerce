import React from "react";

import "./App.css";

import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage/Homepage";
import ShopPage from "./pages/ShopPage/ShopPage";
import Header from "./Components/Header/Header";
import SignInAndSignUpPage from "./pages/SignInAndSignUpPage/SignInAndSignUp";

import { auth } from "./Firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = { currentUser: null };
  }
  unSubscribeFromAuth = null;

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
