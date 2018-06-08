import React from "react";
import Skin from "./skin";
import Request from 'superagent'
import YouTube from 'react-youtube'

export default class Video extends React.Component {
  constructor() {
    super();
  }

  _onReady() {
      console.log("hello")
  }

  render(){

      const opts = {
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          color: 'white',
          controls: 1,
          fs: 0,
          iv_load_policy: 3, //Remove annotations
          modestbranding: 1, //Remove youtube_logo
          rel: 0, // Remove recommended videos
          showinfo: 0 // Hide youtube information like title
        }
      };

      return(
         <YouTube className="video"
           videoId={this.props.trailer}
           opts={opts}
           onReady={this._onReady}
         />
      )
  }

}