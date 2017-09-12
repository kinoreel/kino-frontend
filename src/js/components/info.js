import React from "react";
import {Info} from "./extra";



export class ExtraInfo extends React.Component {
    
  constructor() {
    super();
    this.state = {
      filterVisible: true,

      }
  }
  onClick() {
    this.setState({filterVisible: !this.state.filterVisible});
  };
  
  render() {    
    return (
      <div>
        <button onClick={this.changeMovie.bind(this)} class="btn nextButton">Info</button> 
        { this.state.filterVisible ? <Info extra={this.props.extra}/> : null }
      </div>
       
    );
  }
}