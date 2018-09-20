import React, { Component } from "react";
import HomePage from "./components/HomePage";
import ShowVideo from "./components/ShowVideo";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="app">
        <switch>
          <Route path="/:id" component={ShowVideo} />
          <Route exact path="/" component={HomePage} />
        </switch>
      </div>
    );
  }
}

export default App;
