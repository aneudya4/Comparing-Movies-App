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
    const filtered = data.results.filter((data, i) => i < 4);
    return filtered;
  };

  componentDidMount() {
    // Function names should be meaningful
    this.fetchMovies().then(movies => this.setState({ movies }));
  }

  onCompare = id => {
    // const { movies, moviesToCompare } = this.state;
    // const movieFilter = movie => movie.id === id;
    // if (moviesToCompare.length === 0) {
    //   // You are not reassigning moviesToCompare, use const instead
    //   let moviesToCompare = movies.filter(movieFilter);
    //   this.setState({ moviesToCompare });
    // } else {
    //   let moviesToCompare = [...this.state.moviesToCompare];
    //   let newMovie = movies.filter(movieFilter);
    //   moviesToCompare.push(newMovie[0]); // instead of using filter, use find que te va a
    //   this.setState({ moviesToCompare });
    // }
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
