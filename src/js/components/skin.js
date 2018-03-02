import React from "react";
import Ratings from "./ratings";
import MovieInfo from "./movieinfo";
import {Streams} from "./streams";
import Buttons from "./buttons";
import Filters from "./filters";

export default class Skin extends React.Component {

  constructor() {
   super();
   this.state = {
     searchVisible : false
   }
  }

  toggleSearch = () => {
    this.setState({searchVisible: !this.state.searchVisible})
  }

  renderInfo(){
    return(
      <div>
        <div class="LeftInfo" >
          < Ratings ratings={this.props.ratings}/>
          < MovieInfo
              released={this.props.released}
              runtime={this.props.runtime}
              language={this.props.language}
              director={this.props.director}
              writer={this.props.writer}
          />
        </div>
        <div class="RightInfo">
          < Streams streams={this.props.streams}/>
        </div>
      </div>
    )
  }

  renderFilters(){
    return(
      <div>
        < Filters filters={this.props.filters}
            toggle={this.props.toggle}
            toggleAll={this.props.toggleAll}
            updateRange={this.props.updateRange}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        < Buttons search={this.toggleSearch} next={this.props.next} previous={this.props.previous}/>
        <h1 class="Title">{this.props.title} {this.props.imdb_id}</h1>
        <div class='Info'>
          {!this.state.searchVisible ? this.renderInfo() : null}
          {this.state.searchVisible ? this.renderFilters() : null}
        </div>
      </div>
    );
  }
}