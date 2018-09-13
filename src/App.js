import React, { Component } from "react";
import Card from "./components/Card";

import "./App.css";
import ComparingTable from "./components/ComparingTable";

class App extends Component {
  state = { movies: [], moviesToCompare: [] };

  getting = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=d35dda56d61ee0678a341b8d5c804efc&language=en-US&page=1&region=US";
    const response = await fetch(url);
    const data = await response.json();
    const filtered = data.results.filter((data, i) => i < 4);

    return filtered;
  };
  componentDidMount() {
    this.getting().then(movies => this.setState({ movies }));
  }

  onCompare = id => {
    const { movies, moviesToCompare } = this.state;

    if (moviesToCompare.length === 0) {
      let moviesToCompare = movies.filter(movie => movie.id === id);
      this.setState({ moviesToCompare });
    } else {
      let moviesToCompare = [...this.state.moviesToCompare];
      let newMovie = movies.filter(movie => movie.id === id);
      moviesToCompare.push(newMovie[0]);
      this.setState({ moviesToCompare });
    }
  };

  onRemoveCompare = id => {
    let moviesToCompare = this.state.moviesToCompare.filter(
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

        {moviesToCompare.length >= 2 && (
          <ComparingTable movies={moviesToCompare} />
        )}
      </React.Fragment>
    );
  }
}

export default App;
