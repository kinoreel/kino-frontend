import React from "react";

export class Checkbox extends React.Component{
    
  constructor() {
    super();
    this.state = { 
      checked: true
    };
  }

  hangleChange(){
      this.props.checked[this.props.value] = !this.state.checked
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

            
export class Filters extends React.Component {

  constructor() {
    super();
    this.state = {
      streams: {
        "YouTube": true,
        "iTunes": true,
        "GooglePlay": true,
        "Netflix": true,
        "4oD": true,
        "NowTV": true,
        "AmazonPrime": true,
        "SkyMovies": true,
      }
    }
  };
  
  render() {    
    return (
      <div>
        <div>
          <p class='filterTitle'> STREAMS </p>
          <div class="checkContainer">
            <Checkbox value="YouTube" checked={this.state.streams}/>
            <Checkbox value="iTunes" checked={this.state.streams}/>
            <Checkbox value="GooglePlay" checked={this.state.streams}/>
            <Checkbox value="Netflix" checked={this.state.streams}/>
            <Checkbox value="GooglePlay" checked={this.state.streams}/>
            <Checkbox value="4oD" checked={this.state.streams}/>
            <Checkbox value="NowTV" checked={this.state.streams}/>
            <Checkbox value="SkyMovies" checked={this.state.streams}/>
            <Checkbox value="AmazonPrime" checked={this.state.streams}/>
          </div>
        </div>
     </div>       
    );
  }
}