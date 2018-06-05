import React from "react";

export default class Ratings extends React.Component {

  render() {

    return (
      <div class="RatingDiv">
        <div class="Rating">
          <span>ROTTEN TOMATOES</span>
          <span>{this.props.ratings.rottentomatoes}</span>
        </div>
        <div class="Rating">
          <span>IMDB</span>
          <span>{this.props.ratings.imdb}</span>
        </div>
      </div>

    );
  }
}