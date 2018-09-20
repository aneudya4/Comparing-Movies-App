import React, { Component } from "react";

class ShowVideo extends Component {
  state = { name: "", key: "" };

  componentDidMount() {
    const id = this.props.match.params.id;
    let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d35dda56d61ee0678a341b8d5c804efc&language=en-US`;
    let movieData = fetch(url)
      .then(data => data.json())
      .then(movie => movie.results[0]);
    console.log(movieData);
    movieData.then(movie =>
      this.setState({ name: movie.name, key: movie.key })
    );
  }
  render() {
    if (this.state.key === "") {
      return null;
    }
    return (
      <div className="trailer">
        <iframe
          width="720"
          height="545"
          src={`https://www.youtube.com/embed/${this.state.key}`}
        />
        <h1>{this.state.name}</h1>
      </div>
    );
  }
}

export default ShowVideo;
