import React, { Component } from "react";
import Card from "./components/Card";
import { URL } from "./constants/config";

import "./App.css";
import ComparingTable from "./components/ComparingTable";

class App extends Component {
  state = { movies: [], moviesToCompare: [] };

  fetchMovies = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    const filtered = data.results.filter((data, i) => i < 8);
    return filtered;
  };

  componentDidMount() {
    // Function names should be meaningful
    this.fetchMovies().then(movies => this.setState({ movies }));
  }

  onCompare = id => {
    const { movies, moviesToCompare } = this.state;
    const newMovie = movies.find(movie => movie.id === id);
    moviesToCompare.push(newMovie);
    this.setState({ moviesToCompare });
  };

  onRemoveCompare = id => {
    const moviesToCompare = this.state.moviesToCompare.filter(
      movie => movie.id !== id
    );
    this.setState({ moviesToCompare });
  };

  render() {
    const { movies, moviesToCompare } = this.state;

    return (
      <React.Fragment>
        <div className="cards">
          <h1>Movies Comparing App</h1>
          <p>
            These are 8 movies currently playing in theaters
            <br /> Click two movies to start Comparing them ,movies with a vote
            average less than 7 get a Red-Warning background
          </p>
          {movies.map(movie => (
            <Card
              key={movie.id}
              onRemoveCompare={this.onRemoveCompare}
              onCompare={this.onCompare}
              movie={movie}
            />
          ))}
        </div>
        <ComparingTable movies={moviesToCompare} />
      </React.Fragment>
    );
  }
}

export default App;
