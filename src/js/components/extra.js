import React from "react";

export default class Extra extends React.Component{ 
    
  render() {
    return (
      <div class="extra">
        <p> 
          <span class="tag">RUNTIME:</span> 
          <span class="infoText">{this.props.extra.runtime} minutes </span> 
        </p>
        <p> 
          <span class="tag">LANGUAGE:</span> 
          <span class="infoText">{this.props.extra.language}</span> 
        </p>
        <p> 
          <span class="tag">DIRECTOR:</span>
          <span class="infoText">{this.props.extra.director} </span>
        </p>
        <p> 
          <span class="tag">WRITER:</span>
          <span class="infoText">{this.props.extra.writer}</span>
        </p>
        <p> 
          <span class="tag">CAST:</span>
          <span class="infoText">{this.props.extra.cast}</span> 
        </p>
      </div>
    );
  }
}    
