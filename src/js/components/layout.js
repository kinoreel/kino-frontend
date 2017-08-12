import React from "react";

import Footer from "./footer";
import Header from "./header";
import Request from 'superagent'

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: [],
      ratings: []
    };
  }

  componentWillMount() {
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
      var embedded_link = "http://www.youtube.com/embed/"+trailer_url.slice(trailer_url.indexOf(split_str)+split_str.length)+"?autoplay=1";
      console.log(embedded_link);
      this.setState({
        movie: movie,
        ratings: ratings,
        trailer: embedded_link
      });
    });
  }

  render() {
    return (
      <div>
        <Header changeMovie={this.changeMovie.bind(this)} movie={this.state.movie} ratings={this.state.ratings} trailer={this.state.trailer}/>
        <Footer />
      </div>
    );
  }
}