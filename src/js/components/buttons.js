import React from "react";

export default class Buttons extends React.Component {

   stopPropagation = (e) => {
      e.stopPropagation();
   }

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

  next () {
      this.props.hideVideo()
      this.props.getNextMovie()
      if (this.props.searchVisible) {
        this.props.toggleSearch()
      }
  }

  previous () {
      this.props.hideVideo()
      this.props.getPreviousMovie()
      if (this.props.searchVisible) {
        this.props.toggleSearch()
      }
  }

  render() {
    return (
      <div className="buttonsDiv" onClick={this.stopPropagation.bind(this)}>
        <button className="buttons" onClick={this.previous.bind(this)}><i class="large material-icons buttonIcon">navigate_before</i></button>
        <button className="buttons" onClick={this.props.toggleSearch}> <i class="medium material-icons buttonIcon">search</i></button>
        <button className="buttons" onClick={this.fullscreen.bind(this)}><i class="large material-icons buttonIcon">fullscreen</i></button>
        <button className="buttons" onClick={this.next.bind(this)}><i class="large material-icons buttonIcon">navigate_next</i></button>
      </div>
    );
  }
}