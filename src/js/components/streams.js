import React from "react";

export class Streams extends React.Component {

  render() {
    return (
      <div class="StreamDiv">
        {this.props.streams.googleplay.url ? <Stream source="GOOGLEPLAY" stream={this.props.streams.googleplay}/> : null }
        {this.props.streams.youtube.url ? <Stream source="YOUTUBE" stream={this.props.streams.youtube}/> : null }
        {this.props.streams.itunes.url ? <Stream source="ITUNES" stream={this.props.streams.itunes}/> : null }
      </div>
    );
  }
}

export class Stream extends React.Component {

  render() {

    return (

      <div class="Stream">
        <a href={this.props.stream.url} target="_blank">{this.props.source}</a>
        <span>{this.props.stream.price}</span>
      </div>

    )
  }
}
