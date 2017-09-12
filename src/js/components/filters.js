import React from "react";

export class Checkbox extends React.Component{
    
  constructor() {
    super();
    this.state = { 
      checked: true
    };
  }

  hangleChange(){
    // If the item is currently checked, then it 
    // is being unchecked. So we add it to the list 
    // of unwanted items.
    if (this.state.checked) {
      this.props.filtered.push( this.props.value )
    // Otherwise, it is being checked so we remove it 
    // from the list of unwanted items.
    } else {
      this.props.filtered.splice( this.props.filtered.indexOf(this.props.value), 1 );
    }
    // Swap check status.  
    this.setState({checked: !this.state.checked})
 };
  
  render() {
    return (
      <div class="checkDiv">
        <label>
           <input class="checkInput" type="checkbox" checked={this.state.checked} value={this.props.value} onChange={this.hangleChange.bind(this)}/>
        </label> 
        <span class="checkSpan">{this.props.value}</span>
      </div>
    );
  }
};  

export class RangeSlider extends React.Component{
  constructor() {
    super();
    this.state = { 
      value1: '',
      value2: '',
    }; 
  }
  
  componentWillMount() {
    this.setState({value1: this.props.value1});
    this.setState({value2: this.props.value2});
    this.props.filtered["from"] = this.props.value1;
    this.props.filtered["to"] = this.props.value2;
  }
    
  handleChange(event) {
    if (event.target.id == "value1" ) {
      this.setState({value1: event.target.value})
      this.props.filtered["from"] = Math.min(event.target.value,this.state.value2) 
      this.props.filtered["to"] = Math.max(event.target.value,this.state.value2)
    } else {
      this.setState({value2: event.target.value})
      this.props.filtered["from"] = Math.min(this.state.value1, event.target.value) 
      this.props.filtered["to"] = Math.max(this.state.value1, event.target.value)
    }

    
    console.log(event)
  }

  render() {
    return (
      <div class="rangeDiv">
        <span class="rangeKey">FROM: </span>
        <span class="rangeValues">{this.props.filtered["from"]} </span>
        <span class="rangeKey"> TO: </span>
        <span class="rangeValues">{this.props.filtered["to"]}  </span>
        <input 
          type="range" 
          class = "rangeInput"
          min={this.props.min} max={this.props.max}
          value={this.state.value1} 
          id = "value1"
          onChange={this.handleChange.bind(this)}
          step={this.props.step}/>
        <input
          type="range" 
          class = "rangeInput"
          min={this.props.min} max={this.props.max}
          value={this.state.value2} 
          id="value2"
          onChange={this.handleChange.bind(this)}
          step={this.props.step}/>
          </div>
    );
  }
};  

            
export class Filters extends React.Component {
    
  render() {     
    return (
      <div class="allFilters">
        <div class="checkboxes">
          <div class="checkboxFilters">
            <p class='filterTitle'> STREAMS </p>
            <div class="checkContainer">
              <Checkbox value="YouTube" filtered={this.props.filtered.streams}/>
              <Checkbox value="GooglePlay" filtered={this.props.filtered.streams}/>
              <Checkbox value="iTunes" filtered={this.props.filtered.streams}/>
            </div>
          </div>
          <div class="checkboxFilters">
            <p class='filterTitle'> LANGUAGES </p>
            <div class="checkContainer">
              <Checkbox value="English" filtered={this.props.filtered.languages}/>
              <Checkbox value="German" filtered={this.props.filtered.languages}/>
              <Checkbox value="Sweedish" filtered={this.props.filtered.languages}/>
              <Checkbox value="Korean" filtered={this.props.filtered.languages}/>
              <Checkbox value="Japanese" filtered={this.props.filtered.languages}/>
              <Checkbox value="Spanish" filtered={this.props.filtered.languages}/>
              <Checkbox value="French" filtered={this.props.filtered.languages}/>
              <Checkbox value="Russian" filtered={this.props.filtered.languages}/>
              <Checkbox value="Dannish" filtered={this.props.filtered.languages}/>
              <Checkbox value="Norweigen" filtered={this.props.filtered.languages}/>
            </div>
          </div>    
          <div class="checkboxFilters">
            <p class='filterTitle'> GENRES </p>
            <div class="checkContainer">
              <Checkbox value="Comedy" filtered={this.props.filtered.languages}/>
              <Checkbox value="Horror" filtered={this.props.filtered.languages}/>
              <Checkbox value="Drama" filtered={this.props.filtered.languages}/>
              <Checkbox value="War" filtered={this.props.filtered.languages}/>
              <Checkbox value="Western" filtered={this.props.filtered.languages}/>
              <Checkbox value="Action" filtered={this.props.filtered.languages}/>
              <Checkbox value="Foreign" filtered={this.props.filtered.languages}/>
              <Checkbox value="Thriller" filtered={this.props.filtered.languages}/>
              <Checkbox value="Film Noir" filtered={this.props.filtered.languages}/>
              <Checkbox value="Documentary" filtered={this.props.filtered.languages}/>
              <Checkbox value="Romance" filtered={this.props.filtered.languages}/>
              <Checkbox value="Science Fiction" filtered={this.props.filtered.languages}/>
              <Checkbox value="Musical" filtered={this.props.filtered.languages}/>
              <Checkbox value="Fantasy" filtered={this.props.filtered.languages}/>
              <Checkbox value="Gangster" filtered={this.props.filtered.languages}/>
            </div>
          </div> 
        </div>
        <div class="ranges">        
          <div class="rangeFilters">
            <p class='filterTitle'> RELEASED </p>
            <div class="rangeContainer">
              <RangeSlider value1="2012" value2="2017" max="2017" min="1950" step="1"  filtered={this.props.filtered.released} />
            </div>          
          </div>
          <div class="rangeFilters">
            <p class='filterTitle'> RATED </p>
            <div class="rangeContainer">
              <RangeSlider value1="5.5" value2="10.0" max="10" min="0" step="0.1" filtered={this.props.filtered.rated} />
            </div>          
          </div>
        </div>
     </div>       
    );
  }
}