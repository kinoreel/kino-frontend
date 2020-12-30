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

    next() {
        this.props.hideVideo()
        this.props.getNextMovie()
        if (this.props.searchVisible) {
            this.props.toggleSearch()
        }
    }

    previous() {
        this.props.hideVideo()
        this.props.getPreviousMovie()
        if (this.props.searchVisible) {
            this.props.toggleSearch()
        }
    }

    render() {
        return (
            <div className="row" onClick={this.stopPropagation.bind(this)}>
                {/*<button className="btn-circular main-buttons button-icon d-flex align-items-center"*/}
                {/*        onClick={this.previous.bind(this)}><i className="material-icons">navigate_before</i></button>*/}
                <button className="btn-circular main-buttons button-icon d-flex align-items-center"
                        onClick={this.next.bind(this)}><i className="material-icons">navigate_next</i></button>
                {/*<button className="btn-circular main-buttons button-icon d-flex align-items-center"*/}
                {/*        onClick={this.props.toggleMenu}><i className="material-icons">list</i></button>*/}
                <button className="btn-circular main-buttons button-icon d-flex align-items-center"
                        onClick={this.props.toggleSearch}><i className="material-icons">search</i></button>
                <button className="btn-circular main-buttons button-icon d-flex align-items-center"
                        onClick={this.fullscreen.bind(this)}><i className="material-icons">fullscreen</i></button>
                <button className="btn-circular main-buttons button-icon d-flex align-items-center"
                        onClick={this.props.toggleMute}><i className="material-icons">{this.props.mute ? "volume_off" : "volume_up"}</i></button>
            </div>
        );
    }
}
