import React, { Component } from "react";

import Posts from "./Posts";
import PostPage from "./PostPage";

import Authentication from "./Authentication";

import { Switch, Route, Link } from "react-router-dom";
import UserProfile from "./UserProfile";
//import PostPage from "./PostPage";

class App extends Component {
  render() {
    return (
      <main className="App">
        <Link to="/">
          <h1>Think Piece</h1>
        </Link>
        <Authentication />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/posts/:id" component={PostPage} />
        </Switch>
      </main>
    );
  }
}

export default App;
