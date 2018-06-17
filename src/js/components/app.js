import React from "react";
import Request from 'superagent';
import DataHandler from './datahandler'

export default class App extends React.Component {


  removeLoader () {
    this.setState({loaded: true})
  }

  renderLoader() {
    return (
      <div id="loader">
        <p>KINO</p>
        <button className="startButton" onClick={this.removeLoader.bind(this)}><i class="material-icons md-48">play_arrow</i></button>
      </div>
    );
  }

  render() {
    return (
        <div>
          <DataHandler/>
        </div>
    );
  }
}