import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Articles from "./components/Articles";
import Header from "./components/Header";
import Login from "./components/Login";
import Error from "./components/Error";
import SignUp from "./components/SignUp";
import "./style.css";
import UserProfile from "./components/UserProfile";
import EditProfile from "./components/EditProfile";
import NewArticle from "./components/NewArticle";
import SingleArticle from "./components/SingleArticle";
import EditArticle from "./components/EditArticle";
import ViewProfile from "./components/ViewProfile";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/" component={Articles} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/profiles/:slug" component={ViewProfile} />
          <Route path="/editProfile" component={EditProfile} />
          <Route path="/articles/:slug" component={SingleArticle} />
          <Route path="/editArticle/:slug" component={EditArticle} />
          <Route path="/newArticle" component={NewArticle} />
          <Route component={Error} />
        </Switch>
      </>
    );
  }
}

export default App;
