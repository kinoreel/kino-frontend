import React from "react";

import Movie from "./header/movie";

export default class Header extends React.Component {
  handleChange(e) {
    this.props.changeMovie();
  }

  render() {
    return (
      <div>
        <Movie movie={this.props.movie} ratings={this.props.ratings} trailer={this.props.trailer}/>
        <button onClick={this.handleChange.bind(this)}>Get movie</button>
      </div>
    );
  }
}