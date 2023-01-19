import React from "react";
import Request from 'superagent'
import { NAMEPSACE } from "./globals";

export default class Recommend extends React.Component {

    constructor() {
        super();
        this.state = {
          rating: 1,
        };
      }    

    stopPropagation = (e) => {
        e.stopPropagation();
    }

    setRating = (rating) => {
        this.setState({rating: rating});
    }

    onSubmit = () => {
        const url = NAMEPSACE + "rating/kino/?rating="+this.state.rating+"&imdb_id=" + this.props.imdb_id
        console.log(url)
        Request.get(url).then((response) => {
            console.log(JSON.parse(response["text"]))
        });
        this.props.toggleRecommend()
    }
    
    render() {
        return (
            <div className="report">
                <div className={"row"}>
                    <div className={"col-4 pr-4"}></div>
                    <div className={"col-4"}>
                        <div className={"col-12"}>
                            <div className="row justify-content-center align-content-center" onClick={this.stopPropagation.bind(this)} onMouseDown={this.stopPropagation.bind(this)}>
                            <button className="btn-circular main-buttons button-icon d-flex align-items-center"
                                    onClick={() => this.setRating(1)}><i className="material-icons">{this.state.rating >= 1 ? "star" : "star_outline"}</i>
                            </button>
                            <button className="btn-circular main-buttons button-icon d-flex align-items-center"
                                     onClick={() => this.setRating(2)}><i className="material-icons">{this.state.rating >= 2 ? "star" : "star_outline"}</i>
                            </button>
                            <button className="btn-circular main-buttons button-icon d-flex align-items-center"
                                     onClick={() => this.setRating(3)}><i className="material-icons">{this.state.rating >= 3 ? "star" : "star_outline"}</i>
                            </button>
                            <button className="btn-circular main-buttons button-icon d-flex align-items-center"
                                     onClick={() => this.setRating(4)}><i className="material-icons">{this.state.rating >= 4 ? "star" : "star_outline"}</i>
                            </button>
                            <button className="btn-circular main-buttons button-icon d-flex align-items-center"
                                     onClick={() => this.setRating(5)}><i className="material-icons">{this.state.rating >= 5 ? "star" : "star_outline"}</i>
                            </button>
                            </div>
                        </div>
                        <div className={"col-12 pt-3 mt-2 text-center"} onClick={this.stopPropagation.bind(this)} onMouseDown={this.stopPropagation.bind(this)}>
                            <p className={"report-submit"} onClick={this.onSubmit.bind(this)}>SUBMIT</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
