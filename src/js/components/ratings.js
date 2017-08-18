import React from "react";


export default class Ratings extends React.Component {
  render() {
    var blah = { rotten :this.props.ratings.rotten };
    
    return (
      <div class="ratings">
        <div class="rating"> 
          <span> Rotten.img </span>
          <span> -{blah.rotten}</span>
        </div> 
        <div class="rating"> 
          <span> IMDB.img</span>
          <span> - {this.props.ratings.imdb}</span>
        </div> 
        <div class="rating"> 
          <span> Meta.img </span>
          <span> - {this.props.ratings.metascore}</span>
        </div> 
      </div>
    );
  }
}