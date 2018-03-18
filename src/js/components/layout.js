import React from "react";
import Skin from "./skin";
import Request from 'superagent'
import YouTube from 'react-youtube'
import Spinner from 'react-spinner-material';


export default class Layout extends React.Component {
  constructor() {
    super();

    // Production namespace = https://api.kino-project.tech
    this.namespace = 'http://localhost:8000'

    this.last_seen = []
    this.watched = [],

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

    this.state = {
      skinHidden: true,
      spinnerHidden: true,
      noMovieFoundHidden: true,
      videoHidden: true,
      videoPlayer: null,
      videoPaused: false,
      imdb_id: null,
      title: null,
      language: null,
      year: null,
      runtime: null,
      writer: null,
      director: null,
      trailer: null,
      api_data: null,
      ratings: {
        rottentomatoes: null,
        imdb: null,
      },
      streams: {
        youtube: {
          url: null,
          price: null
        },
        itunes: {
          url: null,
          price: null
        },
        googleplay: {
          url: null,
          price: null
        }
      },
      filters: {
        streams: [
          {
            value: "GooglePlay",
            checked: true
          },{
            value: "YouTube",
            checked: true
          },{
            value: "iTunes",
            checked: true
          },
        ],
        languages: [
          {
            value: "English",
            checked: true
          },{
            value: "French",
            checked: true
          },{
            value: "Spanish",
            checked: true
          },{
            value: "Danish",
            checked: true
          },{
            value: "Korean",
            checked: true
          },{
            value: "English",
            checked: true
          },{
            value: "French",
            checked: true
          },{
            value: "Spanish",
            checked: true
          },{
            value: "Danish",
            checked: true
          },{
            value: "Korean",
            checked: true
          }
        ],
        genres: [
          {
            value: "Horror",
            checked: true
          },{
            value: "Action",
            checked: true
          },{
            value: "Comedy",
            checked: true
          },{
            value: "Drama",
            checked: true
          },{
            value: "Thriller",
            checked: true
          }
        ],
        released: {
          'min': "2000",
          'max': "2014",
        },
        runtime: {
          'min': "20",
          'max': "180",
        },
        imdb: {
          'min': "5",
          'max': "10",
        },
        rottentomatoes: {
          'min': "10",
          'max': "100",
        },
      }
    }
  };

  componentWillMount(){
    this.nextMovie();
    this.removeLoaderTitle();
  }

  componentDidMount(){
    this.removeLoader()
  }

  removeLoaderTitle() {
    const loaderTitle = document.getElementById('loaderTitle')
    if(loaderTitle){
        setTimeout(() => {
            loaderTitle.classList.add('hiddenTitle')
        }, 4000)
    }
  }

  removeLoader () {
    const loader = document.getElementById('loader')
    const main = document.getElementById('main')
    if(main){
      setTimeout(() => {
        loader.classList.add('hidden')
        setTimeout(() => {
          loader.outerHTML = ''
        }, 1000)
      }, 4000)
    }
  }

  /**
  * GET DATA FUNCTIONS
  */

  getUrlParameters = () => {
      var rotten_min = 'rotten_min=' + this.state.filters.rottentomatoes.min;
      var rotten_max = 'rotten_max=' + this.state.filters.rottentomatoes.max;
      var imdb_max = 'imdb_min=' + this.state.filters.imdb.min;
      var imdb_min = 'imdb_max=' + this.state.filters.imdb.max;
      var from_year = 'from_year=' + this.state.filters.released.min;
      var to_year = 'to_year=' + this.state.filters.released.max;
      var languages = [];
      for (var i = 0; i < this.state.filters.languages.length; i++) {
          if (this.state.filters.languages[i]['checked'] == true) {
              languages.push(this.state.filters.languages[i]['value'])
          }
      }
      var language;
      if (languages.length > 0) {
          language = 'language=' + languages.join(',')
      }
      var streams = [];
      for (var i = 0; i < this.state.filters.streams.length; i++) {
          if (this.state.filters.streams[i]['checked'] == true) {
              streams.push(this.state.filters.streams[i]['value'])
          }
      }
      var stream;
      if (streams.length > 0) {
          stream = 'source=' + streams.join(',')
      }
      var genres = [];
      for (var i = 0; i < this.state.filters.genres.length; i++) {
          if (this.state.filters.genres[i]['checked'] == true) {
              genres.push(this.state.filters.genres[i]['value'])
          }
      }
      var genre;
      if (genres.length > 0) {
          genre = 'genre=' + genres.join(',')
      }

      var seen = 'seen=' + this.watched.join(',')
      // missing to_year, from_year, languages, streams, genres from list
      var url_params = [rotten_min, rotten_max, imdb_max, imdb_min, to_year, from_year, language, stream, genre, seen].join('&')

      return url_params
  }


  // Sets the current state with data in movie
  setMovieData = ( movie ) => {

    // Get ratings rom movie
    var ratings = { rottentomatoes: null, imdb: null };

    for (var i = 0; i < movie.ratings.length; i++){
       if (movie.ratings[i].source == 'rotten tomatoes') {
           ratings.rottentomatoes = movie.ratings[i]["rating"]
       } else if (movie.ratings[i].source == 'imdb') {
           ratings.imdb = movie.ratings[i]["rating"]
       }
    }

    // Get streams from movie
    var streams = {
      youtube: {url: null, price: null},
      itunes: {url: null, price: null},
      googleplay: {url: null, price: null}
    }

    for (var i = 0; i < movie.streams.length; i++){

       if (movie.streams[i].source == 'GooglePlay') {
           streams.googleplay.price = movie.streams[i]["price"]
           streams.googleplay.url = movie.streams[i]["url"]
       } else if (movie.streams[i].source == 'YouTube') {
           streams.youtube.price = movie.streams[i]["price"]
           streams.youtube.url = movie.streams[i]["url"]
       } else if (movie.streams[i].source == 'iTunes' && movie.streams[i].purchase_type == 'rental') {
           streams.itunes.price = movie.streams[i]["price"]
           streams.itunes.url = movie.streams[i]["url"]
       }
    }

    var director = movie.director;
    var writer = movie.writer;

    this.setState({
      title: movie.title,
      language: movie.language,
      released: movie.released,
      runtime: movie.runtime,
      writer: movie.writer,
      director: director,
      trailer: movie.trailer,
      ratings: ratings,
      streams: streams,
      imdb_id: movie.imdb_id,
    });

  }

  addToWatched = (imdb_id) => {
    if (!this.watched.includes(imdb_id)) {
        this.watched.push(imdb_id)
    }
  }

  addToLastSeen = (imdb_id) => {
    if (!this.last_seen.includes(imdb_id)) {
        this.last_seen.push(imdb_id)
    }
  }

  removeFromLastSeen = () => {
    this.last_seen.splice(this.last_seen.length-2, 2);
  }

  nextMovie = () => {
    this.hideVideo()
    this.hideNoMovieFound()
    this.showSpinner()
    var url_params = this.getUrlParameters()
    var url = this.namespace + "/movies/random_movie/?" + url_params
    // Request the data
    Request.get(url).then((response) => {
      var movie_data = JSON.parse(response["text"]);
      if (movie_data=="No data found"){
        this.showNoMovieFound()
        this.hideSpinner()
      } else {
        this.setMovieData(movie_data)
        this.addToWatched(movie_data.imdb_id)
        this.addToLastSeen(movie_data.imdb_id)
      }
    });
  }

  previousMovie = () => {
    const imdb_id = this.last_seen[this.last_seen.length - 2]
    if (typeof imdb_id == "undefined") {
      this.nextMovie()
    } else {
      this.hideVideo()
      this.hideNoMovieFound()
      this.showSpinner()
      var url = this.namespace+"/movies/imdb_id/?imdb_id=" + imdb_id
      Request.get(url).then((response) => {
        var movie_data = JSON.parse(response["text"]);
        this.setMovieData(movie_data)
        this.removeFromLastSeen()
      });
    }
  }

  /**
  * RENDER FUNCTIONS
  *
  * These functions control the rendering and visibility of the four states on our web page. These are:
  * - VIDEO PLAYER
  * - NO MOVIE FOUND
  * - LOADING SPINNER
  * - PLAYER SKIN
  */

  renderVideo(){
    return(
       <YouTube id="video" className={this.state.videoHidden ? "video hidden" : "video"}
         videoId={this.state.trailer}
         opts={this.opts}
         onReady={this.onReady.bind(this)}
         onPlay={this.onPlay.bind(this)}
         onPause={this.onPause.bind(this)}
         onEnd={this.nextMovie.bind(this)}
       />
    )
  }

  hideVideo = () => {
    this.setState({videoHidden: true})
    if (this.state.player) {
      this.state.player.mute()
    }
  }

  showVideo = () => {
    this.setState({videoHidden: false})
    if (this.state.player) {
      this.state.player.unMute()
    }
  }

  renderSpinner() {
   return(
     <Spinner className="spinner"
        size={100}
        spinnerColor={"#ffffff"}
        spinnerWidth={10}
        visible={true} />
     )
  }

  hideSpinner = () => {
    this.setState({spinnerHidden: true})
  }

  showSpinner = () => {
    this.setState({spinnerHidden: false})
  }

  renderNoMovieFound() {
    return(
      <p class="noMovie"> NO FILM FOUND THAT MATCHED THE SEARCH CRITERIA </p>
    )
  }

  hideNoMovieFound = () => {
    this.setState({noMovieFoundHidden: true})
  }

  showNoMovieFound = () => {
    this.setState({noMovieFoundHidden: false})
  }

  hideSkin = () => {
    clearTimeout(this.skinTimeout);
    this.setState({skinHidden: false})
    this.skinTimeout = setTimeout(() => {
      if (!this.state.videoPaused) {
        this.setState({skinHidden: true})
        document.body.style.cursor = 'none';
      }
    }, 4000)
  }

  /**
  * PLAYER FUNCTIONS
  *
  * These functions are for the video player and control what
  * happens when actions are performed when the player is paused, played, etc.
  */

  // Sets the state of player once it has loaded so we can control it via the YouTube player API
  onReady = (event) => {
    this.setState({
      player: event.target,
    });
  }

  // When the video plays, show the skin, and set video as shown and playing
  onPlay = () => {
    this.hideSkin();
    this.hideSpinner();
    this.showVideo();
    this.setState({
      videoPaused: false,
    })
  }

  // When video is paused, show skin, and set video as paused.
  onPause = () => {
    this.hideSkin();
    this.setState({videoPaused: true})
  }

  // Function that plays the video if it paused and pauses the video if it is playing
  togglePlayingVideo = () => {
     if (this.state.videoPaused) {
         this.state.player.playVideo();
     } else {
         this.state.player.pauseVideo();
     }
  }

  /**
  * FILTER FUNCTIONS
  *
  * These functions set the state for the filters. They must be kept here as their state
  * must be visible to function that gets data from the API.
  * They are split into function controlling checkboxes and ranges.
  */

  /**
  * CHECKBOX FUNCTIONS
  */

  // Toggles a filter based on filter_id (genres, streams, etc.)
  // and the filter value.
  toggle = (filter_id, value) => {
    const filters = Object.assign({}, this.state.filters);
    this.state.filters[filter_id].map(function(a) {
      if ( a.value == value ) {
          a.checked = !a.checked
      }
    })
    this.setState({filters});
  }

  // Determines if all the values for filter are checked.
  allFiltersChecked = (filter_id) => {
    var all_checked = true
    this.state.filters[filter_id].map(function(a) {
      if ( !a.checked ) {
          all_checked = false;
      }
    })
    return all_checked
  }

  // Sets all filters to checked or unchecked
  // If all filters checked, set all uncheck all filters.
  // Otherwise set all filters to checked.
  toggleAll = (filter_id) => {
    const filters = Object.assign({}, this.state.filters);
    var all_checked = this.allFiltersChecked(filter_id);
    this.state.filters[filter_id].map(function(i) {
       i.checked = !all_checked
    })
    // Reassign value
    this.setState({filters});
  }

  /**
  * RANGE FUNCTIONS
  */

  // Updates the range filter
  updateRange = (range_id, min, max) => {
    // Copy our object
    this.state.filters[range_id].min = min
    this.state.filters[range_id].max = max
  }


  render() {
    return (
      <div id='main' class='main'>
        <div className="videoContainer">
          {this.renderVideo()}
          {this.state.spinnerHidden ? null : this.renderSpinner()}
          {this.state.noMovieFoundHidden ? null : this.renderNoMovieFound()}
        </div>
        <div id="skin"
             className={!this.state.skinHidden ? "Skin shown" : "Skin"}
             onMouseMove={this.hideSkin.bind(this)}
             onClick={this.togglePlayingVideo.bind(this)}
             >
          <Skin
              hideSkin={this.hideSkin}
              next={this.nextMovie}
              previous={this.previousMovie}
              title={this.state.title}
              imdb_id={this.state.imdb_id}
              released={this.state.released}
              runtime={this.state.runtime}
              language={this.state.language}
              director={this.state.director}
              writer={this.state.writer}
              streams={this.state.streams}
              ratings={this.state.ratings}
              filters={this.state.filters}
              toggleAll={this.toggleAll}
              allFiltersChecked={this.allFiltersChecked}
              toggle={this.toggle}
              updateRange={this.updateRange}
              movie={this.state.movie}
              videoHidden={this.state.videoHidden}
              />
        </div>
      </div>
    );
  }
}