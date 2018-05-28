import React from "react";

export default class Ratings extends React.Component {

  renderRating = (rater, rating) => {
    return (
      <div>
        <span>{rater}</span>
        <span>{rating}</span>
      </div>
    )
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div class="col-md-2">
            {this.renderRating('ROTTEN TOMATOES  ', this.props.ratings.rottentomatoes)}
          </div>
          <div class="col-md-2">
            {this.renderRating('IMDB  ', this.props.ratings.imdb)}
          </div>
        </div>
      </div>

    );
  }
}