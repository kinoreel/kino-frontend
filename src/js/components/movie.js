import React from "react";


export default class Movie extends React.Component {
  render() {
    return (
      <div class="movieTitle">
        <h1>{this.props.movie.title}</h1>
      </div>
    );
  }
}