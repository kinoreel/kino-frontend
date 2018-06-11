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
        searchVisible : false,
      }
  }

  toggleSearch = () => {
    this.setState({searchVisible: !this.state.searchVisible});
  }

  renderPlayButton () {
      return(
        <PlayButton playVideo={this.props.playVideo} />
      )
  }

  renderButtons() {
      return(
          <div>
            <Buttons getNextMovie={this.props.getNextMovie}
                     getPreviousMovie={this.props.getPreviousMovie}
                     toggleSearch={this.toggleSearch}
                     searchVisible={this.state.searchVisible}
                     hideVideo={this.props.hideVideo}
            />
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

  renderFilters(){
    return(
      <div>
        < Filters
            filters={this.props.filters}
            toggleCheckbox={this.props.toggleCheckbox}
            toggleAllCheckboxes={this.props.toggleAllCheckboxes}
            allCheckboxesChecked={this.props.allCheckboxesChecked}
            updateRange={this.props.updateRange}
        />
      </div>
    )
  }

  render() {
    return (
        <div>
          {this.renderButtons()}
          <div className="Info">
              {this.props.movieFound && !this.state.searchVisible ? this.renderMovieInfo() : null}
              {this.state.searchVisible ? this.renderFilters() : null}
          </div>
        </div>
    );
  }
}