import React, { Component } from "react";

class ShowVideo extends Component {
  state = { name: "", key: "" };

  handleClick = () => {
    this.props.history.push("/");
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d35dda56d61ee0678a341b8d5c804efc&language=en-US`;
    let movieData = fetch(url)
      .then(data => data.json())
      .then(movie => movie.results[0]);
    movieData.then(movie =>
      this.setState({ name: movie.name, key: movie.key })
    );
  }
  render() {
    const { name, key } = this.state;
    if (key === "") {
      return null;
    }
    return (
      <div className="trailer">
        <iframe
          title={name}
          width="720"
          height="545"
          src={`https://www.youtube.com/embed/${key}`}
        />
        <h1>{name}</h1>
        <button className="bg-1 button" onClick={this.handleClick}>
          Back to All Movies
        </button>
      </div>
    );
  }
}

export default ShowVideo;
