import React from "react";
import Request from 'superagent';
import Layout from './layout'

export default class DataHandler extends React.Component {
  constructor() {
    super();
    /*
    #todo toggle search when search is shown and next or back our clicked
    #todo add spinner
    #todo add no data visible
    #todo css on filters
    #todo add loader

    // Production namespace = https://api.kino-project.tech
    this.namespace = 'https://api.kino-project.tech'

    // List that contains all imdb_ids of films shown to user
    this.watched = [];

    this.state = {
      /*
      There are three states to the website:
       - Movie loading - Requesting a movie from the API
       - Movie found - Response from the API with movie found
       - Movie not found - Response from the API with movie not found
      */

      movieLoading: true,
      movieFound: false,
      movieNotFound: false,

      /*
      The YouTube player is assigned to the state variable 'player' on load time.
      We use this variable to determine the state of the video - paused, playing, loading -
      which other elements react to accordingly.
      */

      player: true,

      /*
      Below are variables that relate to the specific movie information
      These are set using the response from the API.
      */

      title: null,
      language: null,
      year: null,
      runtime: null,
      writer: null,
      director: null,
      trailer: null,
      api_data: null,
      ratings: { rottentomatoes: null, imdb: null },
      streams: {
        youtube: { url: null, price: null },
        itunes: { url: null, price: null },
        googleplay: { url: null, price: null },
        amazon: { url: null, price: null }
      },

      /*
      Filter values that determine the api request.
      They are seperated in checkboxes and ranges. Represented in filters.js
      */

      filters: {
        streams: [
            { value: "GooglePlay", checked: true}, {value: "YouTube", checked: true},
            { value: "iTunes", checked: true}, {value: "Amazon",checked: true}
        ],
        languages: [
          {value: "English",checked: true}, {value: "French",checked: true},
          {value: "Korean",checked: true},{value: "Persian",checked: true},
          {value: "Spanish",checked: true},{value: "Danish",checked: true},
          {value: "German",checked: true},{value: "Hebrew",checked: true},
          {value: "Hungarian",checked: true},{value: "Italian",checked: true},
          {value: "Japanese",checked: true},{value: "Portuguese",checked: true},
          {value: "Romanian",checked: true},{value: "Thai",checked: true}
        ],
        genres: [
          { value: "Drama", checked: true },{ value: "Thriller", checked: true },
          { value: "Comedy", checked: true }, { value: "Science Fiction", checked: true },
          { value: "Documentary", checked: true },{ value: "Adventure", checked: true },
          { value: "Animation", checked: true },{ value: "Romance", checked: true },
          { value: "Horror", checked: true }, { value: "Mystery", checked: true },
          { value: "Music", checked: true },{ value: "War", checked: true },
          { value: "Action", checked: true },{ value: "Fantasy", checked: true },
          { value: "History", checked: true },{ value: "Crime", checked: true },
          { value: "Family", checked: true },{ value: "Western", checked: true }
        ],
        released: { 'min': "2000", 'max': "2018" },
        runtime: { 'min': "20", 'max': "180"},
        imdb: {'min': "5",'max': "10"},
        rottentomatoes: {'min': "10", 'max': "100"}
      }
    }
  }

  componentWillMount(){
    this.getNextMovie();
  }

  setMovieLoading() {
     this.setState({
       movieLoading: true,
       movieFound: false,
       movieNotFound: false,
     })
  }

  setMovieFound() {
     this.setState({
       movieLoading: false,
       movieFound: true,
       movieNotFound: false,
     })
  }

  setMovieNotFound() {
     this.setState({
       movieLoading: false,
       movieFound: false,
       movieNotFound: true,
     })
  }

  getNextMovie = () => {
      /**
      * Gets the next movie from the API, and sets the state of the
      * film elements from the response.
      */
      this.setMovieLoading()
      var url = this.namespace + "/movies/random_movie/"
      Request.get(url).then((response) => {
        var movie_data = JSON.parse(response["text"])
        if (movie_data=="No data found"){
          this.setMovieNotFound()
        } else {
          this.addToWatched(movie_data.imdb_id)
          this.setMovieData(movie_data)
          this.setMovieFound()
        }
      });
  }

  getPreviousMovie = () => {
      /**
      * Gets the previous movie shown.
      * If there is no previous movie, it runs getNextMovie
      */
      // Get index of current film from the watched list
      const current_index = this.watched.indexOf(this.state.imdb_id);
      // If the index if 1 or less then there are no mo previous films
      // so run the getNextMovie function
      if (current_index < 2) {
          this.getNextMovie()
      } else {
          // Else get the previous movie
          const imdb_id = this.watched[current_index - 1]
          this.setMovieLoading()
          // Request the previous movie information from the API.
          const url = this.namespace+"/movies/imdb_id/?imdb_id=" + imdb_id
          Request.get(url).then((response) => {
            var movie_data = JSON.parse(response["text"]);
            this.setMovieData(movie_data)
            this.setMovieFound()
          });
      }
  }

  addToWatched = (imdb_id) => {
    /**
    * Adds an imdb_id to the watched films list.
    * We use this list to prevent showing the same film multiple times.
    */
    if (!this.watched.includes(imdb_id)) {
        this.watched.push(imdb_id)
    }
  }

  setMovieData = ( movie ) => {
      /**
      * Sets the current state of the movie elements based on the response
      * from the API.
      */

      // Get rotten tomatoes and imdb ratings from the API response.
      var ratings = { rottentomatoes: null, imdb: null };
      for (var i = 0; i < movie.ratings.length; i++){
          if (movie.ratings[i].source == 'rotten tomatoes') {
              ratings.rottentomatoes = movie.ratings[i]["rating"]
          } else if (movie.ratings[i].source == 'imdb') {
              ratings.imdb = movie.ratings[i]["rating"]
          }
      }

      // Get streams information from the API response.
      var streams = {
          youtube: {url: null, price: null},
          itunes: {url: null, price: null},
          googleplay: {url: null, price: null},
          amazon: {url: null, price: null}
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
          } else if (movie.streams[i].source == 'Amazon' && movie.streams[i].purchase_type =='purchase' ){
              streams.amazon.price = movie.streams[i]["price"]
              streams.amazon.url = movie.streams[i]["url"]
          }
      }

       // Get director and writer from the API response.
      var director = [];
      var writer = [];
      for (var i = 0; i < movie.persons.length; i++){
          if (movie.persons[i].role == 'director') {
              director.push(movie.persons[i]['fullname'])
          } else if (movie.persons[i].role == 'writer') {
              writer.push(movie.persons[i]['fullname'])
          }
      }
      if (director.length > 3) {
          director.length = 3;
      }
      director = director.join(', ');
      if (writer.length > 3) {
          writer.length = 3;
      }
      writer = writer.join(', ');

      console.log(this.state.filters)

       // Update the React state with the new movie information.
       this.setState({
           imdb_id: movie.imdb_id,
           title: movie.title,
           language: movie.orig_language,
           released: movie.released.substring(0,4),
           runtime: movie.runtime,
           writer: writer,
           director: director,
           trailer: movie.trailer,
           ratings: ratings,
           streams: streams,
       });
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

  // Sets all filters to checked or unchecked
  // If all filters checked, set all uncheck all filters.
  // Otherwise set all filters to checked.
  toggleAllCheckboxes = (filter_id) => {
    const filters = Object.assign({}, this.state.filters);
    var all_checked = this.allFiltersChecked(filter_id);
    this.state.filters[filter_id].map(function(i) {
       i.checked = !all_checked
    })
    // Reassign value
    this.setState({filters});
  }

  // Toggles a filter based on filter_id (genres, streams, etc.)
  // and the filter value.
  toggleCheckbox = (filter_id, value) => {
    const filters = Object.assign({}, this.state.filters);
    this.state.filters[filter_id].map(function(a) {
      if ( a.value == value ) {
          a.checked = !a.checked
      }
    })
    this.setState({filters});
  }

  // Determines if all the values for filter are checked.
  allCheckboxesChecked = (filter_id) => {
    var all_checked = true
    this.state.filters[filter_id].map(function(a) {
      if ( !a.checked ) {
          all_checked = false;
      }
    })
    return all_checked
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
          <div>
            <Layout title={this.state.title}
                released={this.state.released}
                trailer={this.state.trailer}
                runtime={this.state.runtime}
                language={this.state.language}
                director={this.state.director}
                writer={this.state.writer}
                streams={this.state.streams}
                ratings={this.state.ratings}
                getNextMovie={this.getNextMovie.bind(this)}
                getPreviousMovie={this.getPreviousMovie.bind(this)}
                movieFound={this.state.movieFound}
                movieNotFound={this.state.movieNotFound}
                updateRange={this.updateRange.bind(this)}
                allCheckboxesChecked={this.allCheckboxesChecked.bind(this)}
                toggleCheckbox={this.toggleCheckbox.bind(this)}
                toggleAllCheckboxes={this.toggleAllCheckboxes.bind(this)}
                filters={this.state.filters}
            />
          </div>
      );
  }
}
