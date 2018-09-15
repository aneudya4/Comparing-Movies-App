import React, { Component } from "react";

class Card extends Component {
  state = { hover: false, comparing: false };

  applyStyles = () => {
    const { hover, comparing } = this.state;
    let styles = hover || comparing ? "overLay" : null;
    return styles;
  };

  handleCompare = id => {
    const { comparing, click } = this.state;
    this.props.onCompare(id);
    if (!comparing) {
      this.setState({ comparing: true });
    } else if (comparing) {
      this.setState({ comparing: !comparing, click: !click });
    }
    console.log(click);
  };

  handleRemove = id => {
    this.props.onRemoveCompare(id);
    this.setState({ comparing: false, click: !this.state.click });
  };

  renderCompareButton(movie) {
    if (this.state.comparing) return null;
    return (
      <span
        className="compare_button"
        onClick={() => this.handleCompare(movie.id)}
      >
        Compare
      </span>
    );
  }
  renderRemoveButton(movie) {
    if (!this.state.comparing) return null;
    return (
      <span
        className="remove_button"
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
            <p>
              <strong> Movie Title:</strong> <br />
              {movie.title}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
