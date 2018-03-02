import React from 'react';
import YouTube from 'react-youtube'

export default class Trailer extends React.Component {
  constructor() {
    super();

    this.opts = {
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
    }
  }

  videoPaused = () => {
    this.props.lockSkin()
    this.props.showSkin()
  }

  videoPlayed = () => {
    this.props.unlockSkin()
    this.props.hideSkin()
  }

  render() {
    return (
      <YouTube id="video" class="video"
         videoId={this.props.trailer}
         opts={this.opts}
         onEnd={this.props.end}
         onPause={this.videoPaused}
         onPlay={this.videoPlayed}
      />
    )
  }
}