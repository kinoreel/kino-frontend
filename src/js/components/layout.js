import React from "react";

import Footer from "./footer";
import Movie from "./movie";
import Ratings from "./ratings";
import Streams from "./streams";
import Search from "./search";
import {ExtraInfo} from "./extra";
import Request from 'superagent'
import YouTube from 'react-youtube'


export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: [],
      ratings: [],
      streams: [],
      extra: []
    };
    
    this.opts = {
      height: '720',
      width: '1080',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        color: 'white',
        controls: 1,
        iv_load_policy: 3, //Remove annotations
        modestbranding: 0, //Remove youtube_logo
        rel: 0, // Remove recommended videos
        showinfo: 0 // Hide youtube information like title
      }
    };
  }

  componentWillMount() {
    this.opts.width = screen.width*0.8;
    this.opts.height = this.opts.width/16*9;
    this.changeMovie();
  }

  changeMovie() {
    var url = "http://api.kino-project.tech/movies/random_movie/";
    Request.get(url).then((response) => {
      var movie = JSON.parse(response["text"]);
      
      var ratings = movie.ratings;  
      
      var streams = movie.streams;
      
      // Extra
      var extra = {
          director : movie.title,
          writer : "Charlie Kauffman",
          released : "2017"
      };
      
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

  render() {
    return (
      <div class="main">
        <YouTube class="video"
          videoId={this.state.youtube_id}
          opts={this.opts}
          onEnd={this.changeMovie.bind(this)}
        />
        <div>
          <Movie movie={this.state.movie} />
          <button onClick={this.changeMovie.bind(this)} class="btn nextButton">Next Movie</button>
        </div>
        <Ratings ratings={this.state.ratings} />
        <Streams streams={this.state.streams} />
        <ExtraInfo extra={this.state.extra} />
        <Search />
        <div class="footer">
          <p> </p>
        </div>
      </div>
    );
  }
}