import React from "react";

export default class MovieInfo extends React.Component{
  constructor(props) {
    super(props);
  }

  renderInfo = (key, value) => {
    return (
      <div className="row">
        <span class="MovieInfoKey">{key}</span>
        <span class="MovieInfoValue">{value} </span>
      </div>
  )}

  renderRating = (rater, rating) => {
    return (
      <div>
        <span>{rater}</span>
        <span>{rating}</span>
      </div>
    )
  }

  renderStream = (url, source, price) => {
    return (
      <div className="col-md-2">
        <a href={url} target="_blank">{source}</a>
        <span>{price}</span>
      </div>
    )
  }

  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          <h1 className="title">{this.props.title}</h1>
        </div>
        <div className="row">
          <div className="col-md-2">
            <span>ROTTEN TOMATOES</span>
            <span>{this.props.ratings.rottentomatoes}</span>
          </div>
          <div className="col-md-2">
            <span>IMDB</span>
            <span>{this.props.ratings.imdb}</span>
          </div>
          {this.props.streams.googleplay.url ? this.renderStream("GOOGLEPLAY", "GOOGLEPLAY", "1.29") : null }
          {this.props.streams.amazon.url ? this.renderStream("AMAZON", "AMAZON", "1.29") : null }
          {this.props.streams.youtube.url ? this.renderStream("YOUTUBE", "YOUTUBE", "1.29"): null }
          {this.props.streams.itunes.url ? this.renderStream("ITUNES", "ITUNES", "1.29") : null }
        </div>
        <div>
          {this.renderInfo('RUNTIME:', this.props.runtime)}
          {this.renderInfo('LANGUAGE:', this.props.language)}
          {this.renderInfo('DIRECTOR:', this.props.director)}
          {this.renderInfo('RELEASED:', this.props.released)}
          {this.props.writer ? this.renderInfo('WRITER:', this.props.writer) : null}
        </div>
      </div>
    );
  }
}    
