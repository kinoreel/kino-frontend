import React from "react";

export class Loader extends React.Component{

  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-flex loader">
        <div className="row h-100 justify-content-center align-items-center">
            <div className="col-12 text-center">
                <h1>KINO</h1>
                <button className={this.props.loaded ? "btn-loader" : "btn-loader transparent"}
                        disabled="true"
                        onClick={this.props.onRunApp}><i class="material-icons md-48">play_arrow</i>
                </button>
            </div>
        </div>
      </div>
    );
  }
};