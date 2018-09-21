import React from "react";
import PropTypes from "prop-types";
import "./comparingTable.css";

class ComparingTable extends React.Component {
  // sorting the movies and re rendering depending on their vote Average
  renderRows() {
    const movies = [...this.props.movies];
    movies.sort(
      (a, b) => parseFloat(b.vote_average) - parseFloat(a.vote_average)
    );

    // returning tables
    return movies.map(movie => (
      <tr key={movie.id}>
        <td
          style={{
            padding: 25,
            borderRight: "2px solid white",
            borderBottom: "2px solid white"
          }}
        >
          {movie.title}
        </td>
        <td>{movie.release_date}</td>
        <td>{movie.vote_count}</td>
        <td
          className={
            parseInt(movie.vote_average) < 7 ? "votes-bad" : "votes-good"
          }
        >
          {movie.vote_average}
          {this.props.movies > 1 ? this.renderRows(movie.vote_average) : null}
        </td>
      </tr>
    ));
  }

  render() {
    const { movies } = this.props;
    if (movies.length <= 1) {
      return null;
    }

    return (
      <React.Fragment>
        <p>Currently Comparing {movies.length} Movies</p>
        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Release Date</th>
              <th>Vote Count</th>
              <th>Vote Average</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}
ComparingTable.prototypes = {
  movies: PropTypes.object.isRequired
};

export default ComparingTable;
