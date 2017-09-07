import React from "react";

export class Info extends React.Component{
    
  render() {
    return (
      <div class="extra">
        <p> Director : {this.props.extra.director} </p>
        <p> Writer : {this.props.extra.writer} </p>
        <p> Released : {this.props.extra.released} </p>
      </div>
    );
  }
}    
            
export class ExtraInfo extends React.Component {
    
  constructor() {
    super();
    this.state = {
      infoVisible: false,
    }
  }
  onClick() {
    this.setState({infoVisible: !this.state.infoVisible});
  };
  
  render() {    
    return (
      <div>
        <div class="moreInfoSeperator" onClick={this.onClick.bind(this)}>
          <hr width="200"></hr>
          <i class={this.state.infoVisible ? "upArrow": "downArrow"} ></i>
          <hr width="200"></hr>
        </div>
        { this.state.infoVisible ? <Info extra={this.props.extra}/> : null }
      </div>
       
    );
  }
}