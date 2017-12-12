import React from "react";

export class RangeSlider extends React.Component{

  constructor() {
    super();
    this.state = {
      sliderOne: null,
      sliderTwo: null
    };
  }

  componentWillMount() {
    this.setState({sliderOne: this.props.start});
    this.setState({sliderTwo: this.props.end});
  }

  moveSlider = (event) => {
    var min
    var max
    if (event.target.id == "sliderOne" ) {
      this.setState({sliderOne: event.target.value})
      min = Math.min(event.target.value, this.state.sliderTwo)
      max = Math.max(event.target.value, this.state.sliderTwo)
    } else {
      this.setState({sliderTwo: event.target.value})
      min = Math.min(event.target.value, this.state.sliderOne)
      max = Math.max(event.target.value, this.state.sliderOne)
    }
    this.props.updateRange(this.props.rangeType, min, max)
  }


  render() {
    return (
        <div class="range">
          <span class="rangeKey">FROM: </span>
          <span class="rangeValues">{this.props.range.min}</span>
          <span class="rangeKey"> TO: </span>
          <span class="rangeValues">{this.props.range.max}</span>
          <input
            type="range"
            min={this.props.min} max={this.props.max}
            value={this.state.sliderOne}
            id = "sliderOne"
            step={this.props.step}
            onChange={this.moveSlider}
          />
          <input
            type="range"
            min={this.props.min} max={this.props.max}
            value={this.state.sliderTwo}
            id="sliderTwo"
            step={this.props.step}
            onChange={this.moveSlider}
          />
        </div>
    );
  }
};