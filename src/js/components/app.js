import React from "react";
import Request from 'superagent';
import DataHandler from './datahandler'

export default class App extends React.Component {

  render() {
    return (
        <div>
          <DataHandler/>
        </div>
    );
  }
}