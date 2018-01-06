import React from "react";

export default class MovieInfo extends React.Component{

  renderInfo = (key, value) => {
    return (
      <p>
        <span class="MovieInfoKey">{key}</span>
        <span class="MovieInfoValue">{value} </span>
      </p>
  )}

  render() {
    return (
      <div>
        {this.renderInfo('RELEASED:', this.props.year)}
        {this.renderInfo('RUNTIME:', this.props.runtime)}
        {this.renderInfo('LANGUAGE:', this.props.language)}
        {this.renderInfo('DIRECTOR:', this.props.director)}
        { this.props.writer ? this.renderInfo('WRITER:', this.props.writer) : null}
      </div>
    );
  }
}    
