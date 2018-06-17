import React from "react";

export default class Loader extends React.Component {

  render() {
    return (
      <div id="loader">
        <p>KINO</p>
        <div>
           <button className="playButton" onClick={this.props.playVideo}><i class="large material-icons buttonIcon">navigate_next</i></button>
        </div>
      </div>
    );
  }
}