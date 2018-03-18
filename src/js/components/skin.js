import React from "react";
import Ratings from "./ratings";
import MovieInfo from "./movieinfo";
import {Streams} from "./streams";
import Buttons from "./buttons";
import Filters from "./filters";

export default class Skin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchHidden : true,
    }
  }

  toggleSearch = () => {
    this.setState({searchHidden: !this.state.searchHidden});
    this.props.hideSkin();
  }

  renderInfo(){
    return(
      <div className={!this.props.videoHidden ? "info2" : "info2 hidden"}>
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
            allFiltersChecked={this.props.allFiltersChecked}
            updateRange={this.props.updateRange}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        < Buttons search={this.toggleSearch} next={this.props.next} previous={this.props.previous}/>
        <h1 className={!this.props.videoHidden ? "Title" : "Title hidden"}>{this.props.title} {this.props.imdb_id}</h1>
        <div class='Info'>
          {this.state.searchHidden ? this.renderInfo() : null}
          {!this.state.searchHidden ? this.renderFilters() : null}
        </div>
      </div>
    );
  }
}