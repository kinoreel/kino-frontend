import React from "react";

export default class Ratings extends React.Component {

  render() {

    return (
      <div class="col-4 d-inline-block">
        <div class="row">
          <div class="col-lg-8 col-12 pb-2">
              <dt>ROTTEN TOMATOES</dt>
              <dd>{this.props.ratings.rottentomatoes}</dd>
          </div>
          <div class="col-lg-4 col-12 pb-2">
              <dt>IMDB</dt>
              <dd>{this.props.ratings.imdb}</dd>
          </div>
        </div>
      </div>

    );
  }
}