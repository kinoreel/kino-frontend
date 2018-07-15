import React from "react";
import {CheckboxForm} from "./checkboxes";
import {RangeSlider} from "./ranges";

export default class Filters extends React.Component{

   stopPropagation = (e) => {
      e.stopPropagation();
   }

   renderRange = () => {
     return (
         <div class="range-form">
             <span class="key">FROM: </span>
             <span class="value">"10"</span>
             <span class="key"> TO: </span>
             <span class="value">"100"</span>
             <div>
               <input type="range" min="10" max="100" value="20" id = "sliderOne" step="1"/>
               <input type="range" min="10" max="100" value="20" id = "sliderOne" step="1"/>
             </div>
         </div>
     )
   }

   renderRanges = () => {
      return (
        <div class="row" onClick={this.stopPropagation.bind(this)}>
            <div class="col-6 pb-5">
              <div class="row">
                <span class="col-12 filter-title"> RELEASED </span>
                <div class="col-10 pt-2">
                   <RangeSlider start={this.props.filters.released.min} end={this.props.filters.released.max}
                                min="1950" max="2017" step="1" rangeType="released"
                                range={this.props.filters.released} updateRange={this.props.updateRange}/>
                </div>
              </div>
            </div>
            <div class="col-6 pb-5">
              <div class="row">
                <span class="col-12 filter-title"> RUNTIME </span>
                <div class="col-10 pt-2">
                   <RangeSlider start={this.props.filters.runtime.min} end={this.props.filters.runtime.max}
                                min="20" max="180" step="1" rangeType="runtime"
                                range={this.props.filters.runtime} updateRange={this.props.updateRange}/>
                </div>
              </div>
            </div>
            <div class="col-6 pb-5">
              <div class="row">
                <span class="col-12 filter-title"> IMDB </span>
                <div class="col-10 pt-2">
                   <RangeSlider start={this.props.filters.imdb.min} end={this.props.filters.imdb.max}
                                min="0" max="10" step="0.1" rangeType="imdb"
                                range={this.props.filters.imdb} updateRange={this.props.updateRange}/>
                </div>
              </div>
            </div>
            <div class="col-6 pb-5">
              <div class="row">
                <span class="col-12 filter-title"> ROTTEN TOMATOES </span>
                <div class="col-10 pt-2">
                   <RangeSlider start={this.props.filters.rottentomatoes.min} end={this.props.filters.rottentomatoes.max}
                                min="0" max="100" step="1" rangeType="rottentomatoes"
                                range={this.props.filters.rottentomatoes} updateRange={this.props.updateRange}/>
                </div>
              </div>
            </div>
          </div>
      )
   }

   renderCheckboxes = () => {
     return(
      <div class="row" onClick={this.stopPropagation.bind(this)}>
        <div class="col-4">
          <div class="row">
            <span class="col-12 pl-0 pb-2 filter-title">STREAM</span>
            <CheckboxForm
              filters={this.props.filters.streams}
              id='streams'
              toggle={this.props.toggleCheckbox}/>
          </div>
        </div>
        <div class="col-4">
          <div class="row">
            <span class="col-12 pl-0 pb-2 filter-title">GENRE</span>
            <CheckboxForm
              filters={this.props.filters.genres}
              id='genres'
              toggle={this.props.toggleCheckbox}/>
          </div>
        </div>
        <div class="col-4">
          <div class="row">
            <span class="col-12 pl-0 pb-2 filter-title">LANGUAGE</span>
            <CheckboxForm
              filters={this.props.filters.languages}
              id='languages'
              toggle={this.props.toggleCheckbox}/>
          </div>
        </div>
      </div>

     )
   }

/*
  renderCheckbox = (title, filters) => {
    return(
      <div class="checkboxDiv" onClick={this.stopPropagation.bind(this)}>
        <span class='filterTitle'> {title.toUpperCase()} </span>
        < CheckboxTable
              filters={filters}
              CheckboxTable={title}
              toggle={this.props.toggleCheckbox}
              toggleAll={this.props.toggleAllCheckboxes}
              allFiltersChecked={this.props.allCheckboxesChecked}
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
*/
  render() {
    return (
      <div class="container-flex fixed-bottom h-50">
        <div class="row">
            <div class="col-5">
              {this.renderCheckboxes()}
            </div>
            <div class="col-7">
              {this.renderRanges()}
            </div>
          </div>
      </div>
    );
  }
};
