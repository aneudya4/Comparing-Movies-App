import React, { Component } from "react";
import "./homepage.css";
import Card from "./Card";
import { URL } from "../constants/config";
import ComparingTable from "./ComparingTable";

class HomePage extends Component {
  state = { movies: [], moviesToCompare: [] };

  // fetching movies from API
  fetchMovies = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    const movies = data.results.filter((data, i) => i < 8);
    return this.setState({ movies });
  };

  componentDidMount() {
    this.fetchMovies();
  }

  // button handle to compare movies
  onCompare = id => {
    const { movies, moviesToCompare } = this.state;
    const newMovie = movies.find(movie => movie.id === id);
    moviesToCompare.push(newMovie);
    this.setState({ moviesToCompare });
  };

  // button handler to remove movies from being compare
  onRemoveCompare = id => {
    const moviesToCompare = this.state.moviesToCompare.filter(
      movie => movie.id !== id
    );
    this.setState({ moviesToCompare });
  };

  render() {
    const { movies, moviesToCompare } = this.state;
    if (movies.length === 0) return <h1>Movies Are Being Fetch</h1>;

    return (
      <React.Fragment>
        <div className="cards">
          <h1>Movies Comparing App</h1>
          <p>
            These are {movies.length}
            {` `}
            movies currently playing in theaters.
            <br /> Click two movies or more to start comparing them , movies
            with a vote average less than 7 get a Red-Warning background.
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

export default HomePage;
