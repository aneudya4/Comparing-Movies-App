import React, { Component } from "react";
import HomePage from "./components/HomePage";
import ShowVideo from "./components/ShowVideo";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="app wrapper">
        <Switch>
          <Route exact path="/Comparing-movies-app" component={HomePage} />
          <Route path="Comparing-movies-app/:id" component={ShowVideo} />
        </Switch>
      </div>
    );
  }
}

export default App;
