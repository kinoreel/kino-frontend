import React from "react";
import Request from 'superagent';
import DataHandler from './datahandler'

export default class App extends React.Component {

  componentDidMount() {
    this.removeLoader()
  }

  removeLoader () {
    const loader = document.getElementById('loader')
    setTimeout(() => {
      loader.classList.add('hidden')
      setTimeout(() => {
        loader.outerHTML = ''
      }, 1000)
    }, 2000)
  }

  render() {
    return (
        <div>
          <DataHandler/>
        </div>
    );
  }
}