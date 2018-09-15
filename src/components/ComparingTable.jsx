import React from "react";
import "./comparingTable.css";

class ComparingTable extends React.Component {
  // sorting the movies and re rendering depending on their vote Average
  renderRows() {
    const movies = [...this.props.movies];
    movies.sort(
      (a, b) =>
        Math.round(parseFloat(b.vote_average)) -
        Math.round(parseFloat(a.vote_average))
    );

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
            parseInt(movie.vote_average, 10) < 7 ? "votes-bad" : "votes-good"
          }
        >
          {movie.vote_average}
          {this.props.movies > 1 ? this.renderRows(movie.vote_average) : null}
        </td>
      </tr>
    ));
  }

  render() {
    if (this.props.movies.length <= 1) {
      return null;
    }

    return (
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
    );
  }
}

export default ComparingTable;
