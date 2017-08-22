import React from "react";


export default class Streams extends React.Component {
  render() {

    // Set default values for streams
    var streams = {
      googleplay_url :"~", 
      googleplay_price : "2.49",
      youtube_url : "~",
      youtube_price: "2.49",
      itunes_url: "~",
      itunes_price: "~"
    };
      
    // Loop through movie streams and write values to streams
    // object if we have them.
    for (var i = 0; i < this.props.streams.length; i++) {
      if ( this.props.streams[i].source == 'GooglePlay') {
        streams.googleplay_url = this.props.streams[i].url
      } else if ( this.props.streams[i].source == 'iTunes' && this.props.streams[i].purchase_type == 'rental' ) {
        streams.itunes_url = this.props.streams[i].url
        streams.itunes_price = this.props.streams[i].price
      } else if ( this.props.streams[i].source == 'YouTube' ) {
        streams.youtube_url = this.props.streams[i].url;
      };
    };  
      
    // As we do not have the price for Youtube and Googleplay, 
    // we set the value as the max of iTunes price minus £1, or 2.49.
    if (streams.itunes_price != "~") {
      var modelled_price = Math.max(streams.itunes_price - 1, 2.49);
      if (streams.youtube_url != "~") {
        streams.youtube_price = modelled_price
      };
      if (streams.googleplay_url != "~") {
        streams.googleplay_price = modelled_price
      }
    };

    
    // For each stream we construct a component if we have a url for that 
    // stream.
    var googleplay;
    if (streams.googleplay_url != "~") {
      googleplay = (
        <div class="stream">
          <a href={streams.googleplay_url } target="_blank"> Googleplay.img </a>
          <span> - £ {streams.googleplay_price} </span>
        </div>
      )
    } else {
      googleplay = (
        null 
      )
    }

    var youtube;
    if (this.props.streams.youtube_url != "~") {
      youtube = (
        <div class="stream">
          <a href={streams.youtube_url} target="_blank"> YouTube.img  </a>
          <span> - £ {streams.youtube_price} </span>
        </div>
      )
    } else {
      youtube = (
        null
      )
    }
    
    var itunes;
    if (this.props.streams.itunes_url != "~") {
      itunes = (
        <div class="stream">
          <a href={streams.itunes_url} target="_blank"> iTunes.img </a>
          <span> - £ {streams.itunes_price} </span>
        </div>
      )
    } else {
      itunes = (
        null 
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