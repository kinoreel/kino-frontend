import React from "react";

import Trailer from "./trailer";
import Skin from "./skin";
import Request from 'superagent'
import YouTube from 'react-youtube'


export default class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      skinLocked: false,
      watched: [],
      imdb_id: null,
      title: null,
      language: null,
      year: null,
      runtime: null,
      writer: null,
      director: null,
      trailer: null,
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
          'min': "2012",
          'max': "2018",
        },
        runtime: {
          'min': "20",
          'max': "180",
        },
        imdb: {
          'min': "7.5",
          'max': "10",
        },
        rottentomatoes: {
          'min': "75",
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

  renderMovie = ( movie ) => {

    var ratings = {
        rottentomatoes: null,
        imdb: null,
    };

    for (var i = 0; i < movie.ratings.length; i++){
       if (movie.ratings[i].source == 'rotten tomatoes') {
           ratings.rottentomatoes = movie.ratings[i]["rating"]
       } else if (movie.ratings[i].source == 'imdb') {
           ratings.imdb = movie.ratings[i]["rating"]
       }
    }

    var streams = {
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

    var title = movie.title;
    var language = movie.orig_language;
    var released = movie.released.substr(0, 4);
    var runtime = movie.runtime;
    var writer = movie.writer;
    var director = movie.director;
    var imdb_id = movie.imdb_id;
    var trailer = movie.trailer;

    this.setState({
      title: title,
      language: language,
      released: released,
      runtime: runtime,
      writer: writer,
      director: director,
      trailer: trailer,
      ratings: ratings,
      streams: streams,
      imdb_id: imdb_id,
    });
  }

  addToWatched = (imdb_id) => {
    this.state.watched.push(imdb_id)
  }

  removeFromWatched = () => {
    this.state.watched.splice(this.state.watched.length-1, 1);
  }

  get_url_params = () => {
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
      // missing to_year, from_year, languages, stream from list
      var url_params = [rotten_min, rotten_max, imdb_max, imdb_min].join('&')

      return url_params
  }

  nextMovie = () => {
    var url_params = this.get_url_params()
    var url = "http://api.kino-project.tech/movies/random_movie?" + url_params
    console.log(url)
    Request.get(url).then((response) => {
      var movie_data = JSON.parse(response["text"]);
      this.renderMovie(movie_data)
      this.addToWatched(movie_data.imdb_id)
    });
  }

  previousMovie = () => {
    const imdb_id = this.state.watched[this.state.watched.length - 1]
    if (typeof imdb_id == "undefined") {
        var url_params = this.get_url_params()
        var url = "http://api.kino-project.tech/movies/random_movie?" + url_params
    } else {
        var url = "http://api.kino-project.tech/movies/random_movie?imdb_id=" + imdb_id
    }
    Request.get(url).then((response) => {
      var movie_data = JSON.parse(response["text"]);
      this.renderMovie(movie_data)
      this.removeFromWatched()
    });
  }

  showSkin = () => {
    const skin = document.getElementById('skin')
    skin.classList.add('shown')
    document.body.style.cursor = 'default';
  }

  hideSkin = () => {
    const skinLocked = this.state.skinLocked
    this.timeout = setTimeout(function() {
      if (!skinLocked) {
        const skin = document.getElementById('skin')
        skin.classList.remove('shown')
        document.body.style.cursor = 'none';
      }
    }, 4000)
  }

  lockSkin = () => {
    this.setState({skinLocked: true})
  }

  unlockSkin = () => {
    this.setState({skinLocked: false})
  }

  mouseMove() {
    this.showSkin()
    clearTimeout(this.timeout);
    this.hideSkin()
  }

  toggle = (checkboxTable, value) => {
    const filters = Object.assign({}, this.state.filters);
    this.state.filters[checkboxTable].map(function(a) {
      if ( a.value == value ) {
          a.checked = !a.checked
      }
    })
    this.setState({filters});
  }

  toggleAll = checkboxTable => {
    // Copy our object
    const filters = Object.assign({}, this.state.filters);
    // Check if any of the values are set to false
    let allChecked = true
    this.state.filters[checkboxTable].map(function(a) {
      if ( a.checked == false ) {
          allChecked = false
      }
    })
    this.state.filters[checkboxTable].map(function(a) {
      a.checked = !allChecked
    })
    // Reassign value
    this.setState({filters});
  }

  updateRange = (rangeType, min, max) => {
    // Copy our object
    this.state.filters[rangeType].min = min
    this.state.filters[rangeType].max = max
  }

  render() {
    return (
      <div id='main' class='main'>
        <Trailer trailer={this.state.trailer}
                 end={this.nextMovie}
                 lockSkin={this.lockSkin}
                 unlockSkin={this.unlockSkin}
                 hideSkin={this.hideSkin}
                 showSkin={this.showSkin}
        />
        <div id="skin" class="Skin shown" onMouseMove={this.mouseMove.bind(this)}>
          <Skin
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
              toggle={this.toggle}
              updateRange={this.updateRange}
              />
        </div>
      </div>
    );
  }
}