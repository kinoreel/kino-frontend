import React from "react";

export default class PlayButton extends React.Component {

  stopPropagation = (e) => {
      e.stopPropagation();
  }

  render() {
    return (
      <div onClick={this.stopPropagation.bind(this)}>
          <button className="playButton" onClick={this.props.playVideo}><i class="large material-icons buttonIcon">navigate_next</i></button>
      </div>
    );
  }
}