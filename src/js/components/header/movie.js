import React from "react";


export default class Movie extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.movie.title}</h1>
        <h3>{this.props.ratings.source}: {this.props.ratings.rating}</h3>
      </div>
    );
  }
}