import React, { Component } from "react";

class ShowVideo extends Component {
  state = { results: {} };

  handleClick = () => {
    this.props.history.push("/Comparing-movies-app");
  };

  fetchMoviesTrailers = async () => {
    const id = this.props.match.params.id;
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d35dda56d61ee0678a341b8d5c804efc&language=en-US`;
    const fetchigData = await fetch(url);
    const movieData = await fetchigData.json();
    const results = movieData.results[0];
    this.setState({ results });
  };

  componentDidMount() {
    this.fetchMoviesTrailers();

    window.scrollTo(0, 0);
  }
  render() {
    const { results } = this.state;

    if (results === undefined) {
      return null;
    }
    return (
      <div className="trailer">
        <iframe
          title={results.name}
          width="720"
          height="545"
          src={`https://www.youtube.com/embed/${results.key}`}
        />

        <h1>{results.name}</h1>
        <button className="bg-1 button" onClick={this.handleClick}>
          Back to All Movies
        </button>
      </div>
    );
  }
}

export default ShowVideo;
