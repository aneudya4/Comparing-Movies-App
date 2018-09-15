import React, { Component } from "react";
import "./cards.css";

class Card extends Component {
  state = { hover: false, comparing: false, effect: false };

  // comparing function
  handleCompare = id => {
    const { comparing, click } = this.state;
    this.props.onCompare(id);
    if (!comparing) {
      this.setState({ comparing: true });
    } else if (comparing) {
      this.setState({ comparing: !comparing, click: !click });
    }
  };
  // removing movies
  handleRemove = id => {
    this.props.onRemoveCompare(id);
    this.setState({ comparing: false, click: !this.state.click });
  };
  // set the state for the hover effect
  hoverEffect = () => {
    this.setState({ effect: !this.state.effect });
  };
  // rendering the compare button
  renderCompareButton(movie) {
    let animation = this.state.effect ? "animation" : "notAnimation";
    if (this.state.comparing) return null;
    return (
      <span
        className={`compare_button ${animation}`}
        onClick={() => this.handleCompare(movie.id)}
      >
        Compare
      </span>
    );
  }

  // renders the  remove button
  renderRemoveButton(movie) {
    const { comparing, effect } = this.state;
    let animation = effect ? "animation" : "notAnimation";
    if (!comparing) return null;
    return (
      <span
        className={`remove_button ${animation}`}
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
      <div
        onMouseEnter={this.hoverEffect}
        onMouseLeave={this.hoverEffect}
        className={`card ${comparing ? "comparing" : ""}`}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="overLay" />
        {this.renderCompareButton(movie)}
        {this.renderRemoveButton(movie)}
        <div className="stats">
          <div className="title">
            <p>
              <strong>{movie.title}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
