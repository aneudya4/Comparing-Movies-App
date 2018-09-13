import React, { Component } from "react";

class Card extends Component {
  state = { hover: false, comparing: false, click: false };

  handleMouseEnter = () => {
    this.setState({ hover: true });
  };
  handleMouseLeave = () => {
    this.setState({ hover: false });
  };

  applyStyles = () => {
    const { hover, comparing } = this.state;
    let styles = hover || comparing ? "overLay" : null;
    return styles;
  };

  handleCompare = id => {
    const { comparing, click } = this.state;
    this.props.onCompare(id);
    if (!comparing) {
      this.setState({ comparing: true, click: !click });
    } else if (comparing) {
      this.setState({ comparing: !comparing, click: !click });
    }
    console.log(click);
  };

  handleRemove = id => {
    this.props.onRemoveCompare(id);
    this.setState({ comparing: false, click: !this.state.click });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.comparing !== nextState;
  }

  render() {
    const { movie } = this.props;
    const { hover, comparing, click } = this.state;

    return (
      <div
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        className="card"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={this.applyStyles()} />
        {hover && !click ? (
          <span onClick={() => this.handleCompare(movie.id)}>
            {!comparing && "Compare"}
          </span>
        ) : null}
        {comparing ? (
          <span onClick={() => this.handleRemove(movie.id)}>Remove</span>
        ) : null}
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
