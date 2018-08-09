import React from "react";
import {CheckboxForm} from "./checkboxes";
import {RangeSlider} from "./ranges";

export default class Filters extends React.Component{

   stopPropagation = (e) => {
      e.stopPropagation();
   }

   renderRange = () => {
     return (
         <div className="range-form">
             <span className="key">FROM: </span>
             <span className="value">"10"</span>
             <span className="key"> TO: </span>
             <span className="value">"100"</span>
             <div>
               <input type="range" min="10" max="100" value="20" id = "sliderOne" step="1"/>
               <input type="range" min="10" max="100" value="20" id = "sliderOne" step="1"/>
             </div>
         </div>
     )
   }

   renderRanges = () => {
      return (
        <div className="row" onClick={this.stopPropagation.bind(this)}>
            <div className="col-6 pb-5">
              <div className="row">
                <span className="col-12 filter-title"> RELEASED </span>
                <div className="col-10 pt-2">
                   <RangeSlider start={this.props.filters.released.min} end={this.props.filters.released.max}
                                min="1950" max="2017" step="1" rangeType="released"
                                range={this.props.filters.released} updateRange={this.props.updateRange}/>
                </div>
              </div>
            </div>
            <div className="col-6 pb-5">
              <div className="row">
                <span className="col-12 filter-title"> RUNTIME </span>
                <div className="col-10 pt-2">
                   <RangeSlider start={this.props.filters.runtime.min} end={this.props.filters.runtime.max}
                                min="20" max="180" step="1" rangeType="runtime"
                                range={this.props.filters.runtime} updateRange={this.props.updateRange}/>
                </div>
              </div>
            </div>
            <div className="col-6 pb-5">
              <div className="row">
                <span className="col-12 filter-title"> IMDB </span>
                <div className="col-10 pt-2">
                   <RangeSlider start={this.props.filters.imdb.min} end={this.props.filters.imdb.max}
                                min="0" max="10" step="0.1" rangeType="imdb"
                                range={this.props.filters.imdb} updateRange={this.props.updateRange}/>
                </div>
              </div>
            </div>
            <div className="col-6 pb-5">
              <div className="row">
                <span className="col-12 filter-title"> ROTTEN TOMATOES </span>
                <div className="col-10 pt-2">
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
      <div className="row" onClick={this.stopPropagation.bind(this)}>
        <div className="col-4">
          <div className="row">
            <span className="col-12 pb-2 filter-title">STREAM</span>
            <CheckboxForm
              filters={this.props.filters.streams}
              id='streams'
              toggle={this.props.toggleCheckbox}/>
          </div>
        </div>
        <div className="col-4">
          <div className="row">
            <span className="col-12 pb-2 filter-title h-50">GENRE</span>
            <CheckboxForm
              filters={this.props.filters.genres}
              id='genres'
              toggle={this.props.toggleCheckbox}/>
          </div>
        </div>
        <div className="col-4">
          <div className="row">
            <span className="col-12 pb-2 filter-title">LANGUAGE</span>
            <CheckboxForm
              filters={this.props.filters.languages}
              id='languages'
              toggle={this.props.toggleCheckbox}/>
          </div>
        </div>
      </div>

     )
   }

  render() {
    return (
      <div className="filters">
        <div className="row pb-3 h-50">
            <div className="col-12">
                <h1 className="title">Title</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-5">
              {this.renderCheckboxes()}
            </div>
            <div className="col-7">
              {this.renderRanges()}
            </div>
          </div>
      </div>
    );
  }
};
