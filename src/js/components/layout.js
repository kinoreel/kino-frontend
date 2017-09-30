import React from "react";

import Footer from "./footer";
import Movie from "./movie";
import Ratings from "./ratings";
import Streams from "./streams";
import {Filters} from "./filters";
import Extra from "./extra";
import Request from 'superagent'
import YouTube from 'react-youtube'


export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      ispaused: false,
      ishover: false,
      isfullscreen: false,
      filtervisible: false,
      infovisible: true,
      movie: [],
      ratings: [],
      streams: [],
      extra: [],
      filtered: { 
        streams : [], 
        genre: [],
        languages : [],
        released : {
            earliest:'',
            latest:''
        },
        rated : {
            earliest:'',
            latest:''
        }
      },
    };    
                
    this.opts = {
      height: '0',
      width: '0',
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
  }

  componentWillMount() {
    this.opts.width = screen.width;
    this.opts.height = screen.height;
    const loaderTitle = document.getElementById('loaderTitle')
    if(loaderTitle){
        setTimeout(() => {
            loaderTitle.classList.add('hiddenTitle')
        }, 200)
    }
    this.changeMovie();
  }
  
  componentDidMount(){
    const loader = document.getElementById('loader')
    const main = document.getElementById('main')
    if(main){
      setTimeout(() => {
        loader.classList.add('loaded')
        main.classList.remove('loaded')
        setTimeout(() => {
          loader.outerHTML = ''
        }, 1000)
      }, 2000)
    }
  }
  
  changeMovie() {
    

    var url = "http://api.kino-project.tech/movies/random_movie/";
    Request.get(url).then((response) => {
      var movie = JSON.parse(response["text"]);
      
      var ratings = movie.ratings;  
      
      var streams = movie.streams;
      
      // Extra
      var extra = { 
        language: movie.orig_language.toUpperCase(),
        released: movie.released,
        runtime: movie.runtime,
        writer: 'Robert Manteghi',
        director: 'Ted Johansson',
        cast: 'Denise Furlong, Someone Else, One More Person'
      }        
        
      
      // Trailer
      var trailer_url = movie["trailers"][0]["url"]

      var split_str = 'watch?v=';
      
      this.setState({
        movie: movie,
        ratings: ratings,
        streams: streams,
        extra: extra,
        youtube_id: trailer_url.slice(trailer_url.indexOf(split_str)+split_str.length)
      });
    });
  }
  //
  toggleFilters () {
    var filter = document.getElementById('filters')
    if (!this.state.filtervisible){
      filter.classList.remove('hidden') 
      this.setState({filtervisible: true});
      console.log('filter is visible')
    } else {
      filter.classList.add('hidden')      
      console.log('filter is NOT visible')
      this.setState({filtervisible: false});
    }      
    this.setState({infovisible: ! this.state.infovisible});
  };
  
  _onMouseMove() {
      const info = document.getElementById('info')      
      info.classList.add('shown')
      setTimeout(() => {
          if (this.state.ispaused==false && this.state.ishover==false) {
             info.classList.remove('shown')
             console.log('bye')
          }
      }, 100)
  };
  
  videoPaused() {
      const info = document.getElementById('info')
      this.setState({ispaused: true});
      info.classList.add('shown')
    }
    
  videoPlayed() {
      const info = document.getElementById('info')
      this.setState({ispaused: false});
      setTimeout(() => {
          info.classList.remove('shown')
      }, 8000)
    }
  
  _fullscreen() {
    var elem = document.getElementById('main');
        // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
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

  _onMouseEnter() {
      const info = document.getElementById('info')
      this.setState({ishover: true});
      info.classList.add('shown')
  };  

  _onMouseLeave() {
      const info = document.getElementById('info')
      this.setState({ishover: false});
      setTimeout(() => {
          if (this.state.ispaused==false && this.state.ishover==false) {
             info.classList.remove('shown')
          }
      }, 8000)
  };  
  
  buttonHover(){
      info.classList.add('shown')
  }
    
  render() {
    return (
      <div id="main" class="main loaded"  onMouseMove={this._onMouseMove.bind(this)} >
        <div class="videoContainer">
          <YouTube class="video" 
            videoId={this.state.youtube_id}
            opts={this.opts}
            onEnd={this.changeMovie.bind(this)}
            onPause={this.videoPaused.bind(this)}
            onPlay={this.videoPlayed.bind(this)}
            />
        </div>
        <div class="info shown" id="info" >  
          <div class="kinoButtons"  onMouseEnter={this._onMouseEnter.bind(this)} onMouseLeave={this._onMouseLeave.bind(this)}>     
            <button onClick={this.toggleFilters.bind(this)} class="btn nextButton"> <i class="medium material-icons buttonIcon">search</i></button>
            <button onClick={this._fullscreen.bind(this)} class="btn nextButton"><i class="large material-icons buttonIcon">fullscreen</i></button>
            <button onClick={this.changeMovie.bind(this)} class="btn nextButton"><i class="large material-icons buttonIcon">navigate_next</i></button>
          </div>
          <div>
             { this.state.infovisible ? <Movie movie={this.state.movie} /> : null }
          </div>
          <div class="mainInfo">
            <div>
              <div class="infoBox shown" id="infoBox">
                { this.state.infovisible ? <Ratings ratings={this.state.ratings} /> : null }
                { this.state.infovisible ? <Streams streams={this.state.streams} /> : null }
                { this.state.infovisible ? <Extra extra={this.state.extra} /> : null }
              </div>
            </div>
            <div id="filters" class="filters hidden">
              <Filters filtered={this.state.filtered}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}