import React from "react";
import Ratings from "./ratings";
import {Streams} from "./streams";

export default class MovieInfo extends React.Component{
  constructor(props) {
    super(props);
  }

  renderRatings = () => {
    return (
        <div class="col-4 d-inline-block">
          <div class="row">
            <div class="col-lg-8 col-12 pb-2">
              <dt>ROTTEN TOMATOES</dt>
              <dd>{this.props.ratings.rottentomatoes}</dd>
            </div>
            <div class="col-lg-4 col-12 pb-2">
              <dt>IMDB</dt>
              <dd>{this.props.ratings.imdb}</dd>
            </div>
          </div>
        </div>
  )}

  renderStreams(){
    return (
      <div class="col-7 d-inline-block pb-lg-3 pb-4">
        <div class="row justify-content-end">
          {this.props.streams.googleplay.url ?
              <div class="d-inline-block col-lg-3 col-4 pb-2 text-right">
                  <dt><a href={this.props.streams.googleplay.url} target="_blank">GOOGLEPLAY</a></dt>
                  <dd>{this.props.streams.googleplay.price}</dd>
              </div>
          : null}
          {this.props.streams.amazon.url ?
              <div class="d-inline-block col-lg-3 col-4 pb-2 text-right">
                  <dt><a href={this.props.streams.amazon.url} target="_blank">AMAZON</a></dt>
                  <dd>{this.props.streams.amazon.price}</dd>
              </div>
          : null}
          {this.props.streams.youtube.url ?
              <div class="d-inline-block col-lg-3 col-4 pb-2 text-right">
                  <dt><a href={this.props.streams.youtube.url} target="_blank">YOUTUBE</a></dt>
                  <dd>{this.props.streams.youtube.price}</dd>
              </div>
          : null}
          {this.props.streams.itunes.url ?
              <div class="d-inline-block col-lg-3 col-4 pb-2 text-right">
                  <dt><a href={this.props.streams.itunes.url} target="_blank">ITUNES</a></dt>
                  <dd>{this.props.streams.itunes.price}</dd>
              </div>
          : null}
        </div>
      </div>
  )}

  renderInfo(){
    return (
     <div>
         <div class="row">
             <div class="col-12 pb-1">
               <span class="movieinfo-dd">DIRECTOR:</span>
               <span class="movieinfo-dt pl-2">{this.props.director}</span>
             </div>
         </div>
         {this.props.writer ?
             <div class="row">
                 <div class="col-12 pb-1">
                   <span class="movieinfo-dd">WRITER:</span>
                   <span class="movieinfo-dt pl-2">{this.props.writer}</span>
                 </div>
             </div>
         : null}
         <div class="row">
             <div class="col-12 pb-1">
               <span class="movieinfo-dd">LANGUAGE:</span>
               <span class="movieinfo-dt pl-2">{this.props.language}</span>
             </div>
         </div>
         <div class="row">
             <div class="col-12 pb-1">
               <span class="movieinfo-dd">RUNTIME:</span>
               <span class="movieinfo-dt pl-2">{this.props.runtime}</span>
           </div>
         </div>
         <div class="row">
             <div class="col-12 pb-1">
               <span class="movieinfo-dd">RELEASED:</span>
               <span class="movieinfo-dt pl-2">{this.props.released}</span>
             </div>
         </div>
      </div>
  )}

  render() {
    return (
      <div class="container-flex movie-info">
          <div class="row pb-3">
              <div class="col-12">
                  <h1 class="title">{this.props.title}</h1>
              </div>
          </div>
          <div class="fixed-bottom h-50">
              <div class="row justify-content-between">
                  {this.renderRatings()}
                  {this.renderStreams()}
              </div>
              <div class="d-none d-lg-block">
                  {this.renderInfo()}
              </div>
          </div>
      </div>
    );
  }
}    
