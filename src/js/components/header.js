import React from "react";

import Movie from "./header/movie";

export default class Header extends React.Component {
  handleChange(e) {
    this.props.changeMovie();
  }

  render() {
    return (
      <div class="textArea">
        <Movie movie={this.props.movie} ratings={this.props.ratings}/>
        <button onClick={this.handleChange.bind(this)} class="btn btn-primary">Get movie</button>
      </div>
    );
  }
}