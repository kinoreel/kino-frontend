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
      title: null,
      language: null,
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

    var ratings = movie.ratings;
    var streams = movie.streams;
    var title = movie.title;
    var language = movie.lang;
    var runtime = movie.runtime;
    var writer = movie.writer;
    var director = movie.director;
    var trailer = movie.trailer;

    this.setState({
      title: title,
      language: language,
      runtime: runtime,
      writer: writer,
      director: director,
      trailer: trailer,
      ratings: ratings,
      streams: streams,
    });
  }

  addToWatched = (imdb_id) => {
    this.state.watched.push(imdb_id)
  }

  nextMovie = () => {
    var url = "http://127.0.0.1:8000/movies/api/v1.0/get_movies" //"http://api.kino-project.tech/movies/random_movie/";
    Request.get(url).then((response) => {
      var movie_data = JSON.parse(response["text"]);
      this.renderMovie(movie_data)
      this.addToWatched(movie_data.imdb_id)
    });

  }

  removeFromWatched = () => {
    this.state.watched.splice(this.state.watched.length-1, 1);
  }

  previousMovie = () => {
    const imdb_id = this.state.watched[this.state.watched.length - 1]
    if (typeof imdb_id == "undefined") {
      console.log(imdb_id)
    } else {
      console.log('new')
    }
    var url = "http://127.0.0.1:8000/movies/api/v1.0/get_movies" //"http://api.kino-project.tech/movies/random_movie/";
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
                 end={this.changeMovie}
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