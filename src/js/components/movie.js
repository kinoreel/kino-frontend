import React from "react";


export default class Movie extends React.Component {
  render() {
    return (
      <div>
        <h1 class="movieTitle">{this.props.movie.title}</h1>
      </div>
    );
  }
}