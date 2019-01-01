import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./cards.css";

class Card extends Component {
  state = { hover: false, comparing: false };

  // comparing function
  handleCompare = id => {
    const { comparing } = this.state;
    this.props.onCompare(id);
    if (!comparing) {
      this.setState({ comparing: true });
    } else if (comparing) {
      this.setState({ comparing: !comparing });
    }
  };
  // removing movies
  handleRemove = id => {
    this.props.onRemoveCompare(id);
    this.setState({ comparing: !this.state.comparing });
  };

  // rendering the compare button
  renderCompareButton = movie => {
    if (this.state.comparing) return null;
    return (
      <span
        className="btn compare_button notAnimation"
        onClick={() => this.handleCompare(movie.id)}
      >
        Compare
      </span>
    );
  };

  // renders the  remove button
  renderRemoveButton(movie) {
    const { comparing } = this.state;

    if (!comparing) return null;
    return (
      <span
        className="btn remove_button notAnimation"
        onClick={() => this.handleRemove(movie.id)}
      >
        Remove
      </span>
    );
  }

  render() {
    const { movie } = this.props;
    const { comparing } = this.state;
    return (
      <div className={`card ${comparing ? "comparing" : ""}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="overLay" />
        {this.renderCompareButton(movie)}
        {this.renderRemoveButton(movie)}
        <div className="stats">
          <div className="title">
            <h2>{movie.title}</h2>
            <Link to={`/Comparing-movies-app/${movie.id}`}>
              {" "}
              Watch trailer{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
Card.propTypes = {
  movie: PropTypes.object.isRequired,
  onCompare: PropTypes.func.isRequired,
  onRemoveCompare: PropTypes.func.isRequired
};

export default Card;
