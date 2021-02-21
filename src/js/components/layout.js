import React from "react";
import YouTube from 'react-youtube'
import Skin from './skin'
import {
    isBrowser
} from "react-device-detect";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            skinVisible: true,
            videoVisible: false,
            playerLoaded: false,
            pause: false,
            mute: false,
        }
    }

    removeLoader() {
        this.setState({loaded: true})
        this.playVideo()
    }

    renderLoader() {
        return (
            <div className="container-flex loader">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-12 text-center">
                        <h1>KINO</h1>
                        {isBrowser ?
                            <div>
                                <button className={this.state.playerLoaded ? "btn-loader" : "btn-loader transparent"}
                                        disabled={!this.state.playerLoaded}
                                        onClick={this.removeLoader.bind(this)}><i
                                    class="material-icons md-48">play_arrow</i>
                                </button>
                                <div className={"contributors"}>
                                    <p className={"contributor-title"}>CONTRIBUTORS</p>
                                    <p className={"contributor-name"}>ROBERT MANTEGHI</p>
                                    <p className={"contributor-name"}>SUZI SIMMS</p>
                                    <p className={"contributor-name"}>JOE DODD</p>
                                </div>
                            </div>
                            : <p className={"mobile"}>NOT AVAILABLE ON MOBILE</p>}
                    </div>
                </div>
            </div>
        );
    }

    showSkin() {
        /*
        Shows the skin, then after a timeout hides the skin
        */
        /* Set state to show skin */
        this.setState({skinVisible: true})
        document.querySelector("body").style.cursor = "auto"

        /* Reset the any previous timeouts on the skin.
           This prevents the skin timing out/disappearing early*/
        clearTimeout(this.skinTimeout);
        /* Set state to hide skin in 4s, if video is not paused */
        this.skinTimeout = setTimeout(() => {
            if (this.player.getPlayerState() == 1 || this.player.getPlayerState() === undefined) {
                this.setState({skinVisible: false})
                document.querySelector("body").style.cursor = "none"
            }
        }, 3000)
    }

    renderNoMovieFound() {
        return (
            <div className="noMovie">
                <p> NO FILM FOUND THAT MATCHED THE SEARCH CRITERIA </p>
            </div>
        )
    }

    renderVideo() {
        const opts = {
            playerVars: { // https://developers.google.com/youtube/player_parameters
                //autoplay: 1,
                color: 'white',
                controls: 1,
                fs: 0,
                iv_load_policy: 3, //Remove annotations
                modestbranding: 1, //Remove youtube_logo
                rel: 0, // Remove recommended videos
                showinfo: 0 // Hide youtube information like title
            }
        };

        return (
            <YouTube className="video"
                     videoId={this.props.trailer}
                     opts={opts}
                     onReady={this.onVideoReady.bind(this)}
                     onPlay={this.onPlay.bind(this)}
                     onPause={this.onPause.bind(this)}
                     onEnd={this.props.getNextMovie}
                     onStateChange={this.videoStateChange.bind(this)}
            />

        )
    }

    onVideoReady = (event) => {
        this.player = event.target
        this.setState({playerLoaded: true})
    }

    videoStateChange = () => {
        if (this.player.getPlayerState() == 5 && this.state.loaded) {
            this.playVideo()
        }
    }

    playVideo = () => {
        this.player.playVideo()
    }

    onPlay = () => {
        this.showSkin();
        this.showVideo();
    }

    onPause = () => {
        this.showSkin();
    }

    hideVideo = () => {
        this.setState({videoVisible: false})
        if (this.player) {
            this.player.mute()
        }
    }

    showVideo = () => {
        this.setState({videoVisible: true})
        if (this.player && !this.state.mute) {
            this.player.unMute()
        }
    }

    toggleMute = () => {
        let mute = this.state.mute;
        if (mute) {
            this.player.unMute()
            console.log('unmuting')
        } else {
            console.log('muting')
            this.player.mute()
        }
        this.setState({
            mute: !mute
        })
    }

    videoIsVisible = () => {
        if (this.player) {
            return this.props.movieFound && this.state.videoVisible && this.player.getPlayerState() == 1
        }
        return false;
    }

    render() {

        return (
            <div className="app">
                {!this.state.loaded ? this.renderLoader() : null}
                <div onClick={this.toggleMute.bind(this)}>
                    <div className={this.props.movieFound && this.state.videoVisible ? "" : "transparent"}>
                        {this.renderVideo()}
                    </div>
                    <div className={this.state.skinVisible ? "" : "transparent"}
                         onMouseMove={this.showSkin.bind(this)}>
                        <Skin title={this.props.title}
                              released={this.props.released}
                              runtime={this.props.runtime}
                              language={this.props.language}
                              director={this.props.director}
                              writer={this.props.writer}
                              streams={this.props.streams}
                              ratings={this.props.ratings}
                              hideVideo={this.hideVideo.bind(this)}
                              playVideo={this.playVideo.bind(this)}
                              getNextMovie={this.props.getNextMovie}
                              getPreviousMovie={this.props.getPreviousMovie}
                              movieFound={this.props.movieFound}
                              movieNotFound={this.props.movieNotFound}
                              filters={this.props.filters}
                              updateRange={this.props.updateRange}
                              allCheckboxesChecked={this.props.allCheckboxesChecked}
                              toggleCheckbox={this.props.toggleCheckbox}
                              toggleAllCheckboxes={this.props.toggleAllCheckboxes}
                              toggleMute={this.toggleMute.bind(this)}
                              mute={this.state.mute}

                        />
                    </div>
                </div>
            </div>
        );
    }
}
