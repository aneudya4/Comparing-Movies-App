import React, { Component } from "react";
import { key } from "../apiConfig/apiConfig";

class ShowVideo extends Component {
  state = { results: null };

  handleClick = () => {
    this.props.history.push("/Comparing-movies-app");
  };

  fetchMoviesTrailers = async () => {
    const id = this.props.match.params.id;

    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`;
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

    if (!results) {
      return <div>Trailer is being Loaded ....</div>;
    }
    return (
      <div className="trailer">
        {console.log(this.state.results, "here")}
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
