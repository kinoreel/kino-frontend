import React from "react";


export default class Streams extends React.Component {
  render() {

    var googleplay;
    if (this.props.streams.googleplay_url != "~") {
      googleplay = (
        <div class="stream">
          <a href={this.props.streams.googleplay_url } target="_blank"> Googleplay.img </a>
          <span> - £ {this.props.streams.googleplay_price} </span>
        </div>
      )
    } else {
      googleplay = (
        <div class="stream">
          <span></span>
        </div>  
      )
    }

    var youtube;
    if (this.props.streams.youtube_url != "~") {
      youtube = (
        <div class="stream">
          <a href={this.props.streams.youtube_url} target="_blank"> YouTube.img  </a>
          <span> - £ {this.props.streams.youtube_price} </span>
        </div>
      )
    } else {
      youtube = (
        <div class="stream">
          <span></span>
        </div>  
      )
    }
    
    var itunes;
    if (this.props.streams.itunes_url != "~") {
      itunes = (
        <div class="stream">
          <a href={this.props.streams.itunes_url} target="_blank"> iTunes.img </a>
          <span> - £ {this.props.streams.itunes_price} </span>
        </div>
      )
    } else {
      itunes = (
        <div class="stream">
          <span></span>
        </div>  
      )
    }
        
    return (
      <div class="streams">
        {googleplay}
        {youtube}
        {itunes}
      </div>
    );
  }
}