import React, { Component } from "react";
import HomePage from "./components/HomePage";
import ShowVideo from "./components/ShowVideo";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" component={HomePage} />
          <Route path="/:id" component={ShowVideo} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
