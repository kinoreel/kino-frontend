import React from "react";

export default class Buttons extends React.Component {

  fullscreen() {
    var elem = document.getElementById('app');

    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
  }

  render() {

    return (
      <div class="ButtonsDiv">
        <button class="Buttons" onClick={this.props.previous}><i class="large material-icons buttonIcon">navigate_before</i></button>
        <button class="Buttons" onClick={this.props.search}> <i class="medium material-icons buttonIcon">search</i></button>
        <button class="Buttons" onClick={this.fullscreen.bind(this)}><i class="large material-icons buttonIcon">fullscreen</i></button>
        <button class="Buttons" onClick={this.props.next}><i class="large material-icons buttonIcon">navigate_next</i></button>
      </div>
    );
  }
}