import React from "react";


export default class Ratings extends React.Component {
  render() {
    
    // Set default ratings
    var ratings = {
      rotten:'~',
      imdb:'~',
      metascore:'~'
    };

    // Loop through movie ratings, and write score
    // to movie object if it exists. 
    for (var i = 0; i < this.props.ratings.length; i++) {
      if ( this.props.ratings[i].source == 'rotten tomatoes') {
        ratings.rotten = this.props.ratings[i].rating
      } else if ( this.props.ratings[i].source == 'imdb' ) {
        ratings.imdb = this.props.ratings[i].rating
      } else if ( this.props.ratings[i].source == 'metascore' ) {
        ratings.metascore = this.props.ratings[i].rating;
      };
    };
    
    return (
      <div class="ratings">
        <div class="rating"> 
          <span> Rotten Tomatoes -  </span>
          <span> {ratings.rotten}</span>
        </div> 
        <div class="rating"> 
          <span> IMDB -  </span>
          <span> {ratings.imdb}</span>
        </div> 
        <div class="rating"> 
          <span> Metasore  - </span>
          <span> {ratings.metascore}</span>
        </div> 
      </div>
    );
  }
}