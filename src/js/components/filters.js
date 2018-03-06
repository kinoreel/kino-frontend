import React from "react";
import {CheckboxTable} from "./checkboxes";
import {RangeSlider} from "./ranges";

export default class Filters extends React.Component{

   stopPropagation = (e) => {
      e.stopPropagation();
   }

  renderCheckbox = (title, filters) => {
    return(
      <div class="checkboxDiv" onClick={this.stopPropagation.bind(this)}>
        <span class='filterTitle'> {title.toUpperCase()} </span>
        < CheckboxTable
              filters={filters}
              CheckboxTable={title}
              toggle={this.props.toggle}
        />
      </div>
  )}

  renderRange = (title, filter, range_type, start, end, min, max, step, updateRange ) => {
    return (
      <div class= "rangeDiv" onClick={this.stopPropagation.bind(this)}>
        <p class='filterTitle'> {title.toUpperCase()}</p>
        <RangeSlider start={start} end={end} min={min} max={max} step={step} rangeType={range_type}
            range={filter} updateRange={updateRange}
        />
      </div>
  )}

  render() {
    return (
      <div class='filters'>
        <div class="checkboxes">
          {this.renderCheckbox("streams", this.props.filters.streams)}
          {this.renderCheckbox("languages", this.props.filters.languages)}
          {this.renderCheckbox("genres", this.props.filters.genres)}
        </div>
        <div class="ranges">
          <div class="leftRanges">
            {this.renderRange("released", this.props.filters.released, "released"
                             , this.props.filters.released.min, this.props.filters.released.max
                             , "1950", "2017", "1", this.props.updateRange)}
            {this.renderRange("runtime", this.props.filters.runtime, "runtime"
                             , this.props.filters.runtime.min, this.props.filters.runtime.max
                             , "20", "180", "1", this.props.updateRange)}
          </div>
          <div class="rightRanges">
            {this.renderRange("imdb", this.props.filters.imdb, "imdb"
                             , this.props.filters.imdb.min, this.props.filters.imdb.max
                             , "0", "10", "0.1", this.props.updateRange)}
            {this.renderRange("rotten tomatoes", this.props.filters.rottentomatoes, "rottentomatoes"
                             , this.props.filters.rottentomatoes.min, this.props.filters.rottentomatoes.max
                             , "0", "100", "1", this.props.updateRange)}
          </div>
        </div>
      </div>
    );
  }
};
