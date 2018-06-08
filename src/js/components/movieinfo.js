import React from "react";
import Ratings from "./ratings";
import {Streams} from "./streams";

export default class MovieInfo extends React.Component{
  constructor(props) {
    super(props);
  }

  renderInfo = (key, value) => {
    return (
      <p>
        <span class="movieInfoKey">{key}</span>
        <span class="movieInfoValue">{value} </span>
      </p>
  )}

  render() {
    return (
      <div>
        {this.renderInfo('RUNTIME:', this.props.runtime)}
        {this.renderInfo('LANGUAGE:', this.props.language)}
        {this.renderInfo('DIRECTOR:', this.props.director)}
        {this.renderInfo('RELEASED:', this.props.released)}
        {this.props.writer ? this.renderInfo('WRITER:', this.props.writer) : null}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>
          <h1 className="Title">{this.props.title}</h1>
          <div class="LeftInfo" >
            <Ratings ratings={this.props.ratings}/>
            <div>
               {this.renderInfo('RUNTIME:', this.props.runtime)}
               {this.renderInfo('LANGUAGE:', this.props.language)}
               {this.renderInfo('DIRECTOR:', this.props.director)}
               {this.renderInfo('RELEASED:', this.props.released)}
               {this.props.writer ? this.renderInfo('WRITER:', this.props.writer) : null}
            </div>
          </div>
          <div class="RightInfo">
            < Streams streams={this.props.streams}/>
          </div>
        </div>
      </div>
    );
  }
}    
