import React from "react";

import Footer from "./footer";
import Header from "./header";
import Request from 'superagent'
import YouTube from 'react-youtube'

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: [],
      ratings: []
    };
    this.opts = {
      height: '720',
      width: '1080',
      playerVars: {
        autoplay: 1
      }
    };
  }

  componentWillMount() {
    console.log(document.getElementById("app").offsetWidth)
    console.log(screen.width)
    this.opts.width = screen.width*0.8;
    this.opts.height = this.opts.width/16*9;
    this.changeMovie();
  }

  changeMovie() {
    var url = "http://localhost:8000/movies/random_movie/";
    Request.get(url).then((response) => {
      var movie = JSON.parse(response["text"]);
      var ratings = {}

      for (var i=0; i<1; i++){
        ratings = movie["ratings"][i]
        var trailer_url = movie["trailers"][i]["url"]
      }
      var split_str = 'watch?v=';
      this.setState({
        movie: movie,
        ratings: ratings,
        youtube_id: trailer_url.slice(trailer_url.indexOf(split_str)+split_str.length)
      });
    });
  }

  render() {
    return (
      <div class="main">
        <YouTube
          videoId={this.state.youtube_id}
          opts={this.opts}
          onEnd={this.changeMovie.bind(this)}
        />
        <Header changeMovie={this.changeMovie.bind(this)} movie={this.state.movie} ratings={this.state.ratings}/>
      </div>
    );
  }
}