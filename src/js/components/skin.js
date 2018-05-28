import React from "react";
import Ratings from "./ratings";
import MovieInfo from "./movieinfo";
import {Streams} from "./streams";
import Buttons from "./buttons";
import Filters from "./filters";

export default class Skin extends React.Component {

  constructor(props) {
      super(props);
  }

  renderButtons() {
      return(
          <div>
            <Buttons getNextMovie={this.props.getNextMovie}
                     getPreviousMovie={this.props.getPreviousMovie}/>
          </div>
      )
  }

  renderMovieInfo(){
    return(
       <div>
         < MovieInfo
            title={this.props.title}
            released={this.props.released}
            runtime={this.props.runtime}
            language={this.props.language}
            director={this.props.director}
            writer={this.props.writer}
            ratings={this.props.ratings}
            streams={this.props.streams}
         />
       </div>
    )
  }

  render() {
    return (
        <div>
          {this.renderButtons()}
          {this.props.movieFound ? this.renderMovieInfo() : null}
        </div>
    );
  }
}