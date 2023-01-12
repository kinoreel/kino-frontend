import React from "react";
import Ratings from "./ratings";
import MovieInfo from "./movieinfo";
import {Streams} from "./streams";
import Buttons from "./buttons";
import Filters from "./filters";
import Report from "./report";
import Recommend from "./recommend";

export default class Skin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchVisible: false,
            reportingVisible: false,
            recommendVisible: false,
        }
    }

    toggleSearch = () => {
        this.setState({
            searchVisible: !this.state.searchVisible,
            reportingVisible: false,
            recommendVisible: false,
        });
    }

    toggleReporting = () => {
        this.setState({
            reportingVisible: !this.state.reportingVisible,
            searchVisible: false,
            recommendVisible: false
        });
    }

    toggleRecommend = () => {
        this.setState({
            recommendVisible: !this.state.recommendVisible,
            searchVisible: false,
            reportingVisible: false
        });
    }

    renderMovieInfo() {
        return (
            <div>
                <MovieInfo
                    title={this.props.title}
                    released={this.props.released}
                    runtime={this.props.runtime}
                    language={this.props.language}
                    director={this.props.director}
                    writer={this.props.writer}
                    ratings={this.props.ratings}
                    streams={this.props.streams}
                />
            </div>
        )
    }

    renderFilters() {
        return (
            <div>
                <Filters
                    filters={this.props.filters}
                    toggleCheckbox={this.props.toggleCheckbox}
                    toggleAllCheckboxes={this.props.toggleAllCheckboxes}
                    allCheckboxesChecked={this.props.allCheckboxesChecked}
                    updateRange={this.props.updateRange}
                />
            </div>
        )
    }

    renderReportWindow() {
        return (
            <div>
               <Report
                   toggleReporting={this.toggleReporting.bind(this)}
                   getNextMovie={this.props.getNextMovie}
               />
            </div>
        )
    }

    renderRecommendWindow(){
        return (
            <div>
                <Recommend
                    toggleRecommend={this.toggleRecommend.bind(this)}
                />
            </div>
        )
    }

    render() {
        return (
            <div className="container-flex pt-4 pr-7 pl-7 skin">
                <Buttons getNextMovie={this.props.getNextMovie}
                         getPreviousMovie={this.props.getPreviousMovie}
                         toggleSearch={this.toggleSearch}
                         toggleMute={this.props.toggleMute}
                         mute={this.props.mute}
                         toggleReporting={this.toggleReporting.bind(this)}
                         toggleRecommend={this.toggleRecommend.bind(this)}
                         searchVisible={this.state.searchVisible}
                         reportingVisible={this.state.reportingVisible}
                         recommendVisible={this.state.reportingVisible}
                         hideVideo={this.props.hideVideo}
                         movieFound={this.props.movieFound}
                />
                {this.state.reportingVisible ? this.renderReportWindow() : null}
                {this.state.recommendVisible ? this.renderRecommendWindow() : null}
                {this.state.searchVisible ? this.renderFilters() : null}
                {this.props.movieFound && !this.state.reportingVisible && !this.state.searchVisible && !this.state.recommendVisible  ?
                    <div className="row lower-skin">
                        <div>
                            <MovieInfo
                                title={this.props.title}
                                released={this.props.released}
                                runtime={this.props.runtime}
                                language={this.props.language}
                                director={this.props.director}
                                writer={this.props.writer}
                                ratings={this.props.ratings}
                                streams={this.props.streams}
                                mute={this.props.mute}
                            />
                        </div>
                    </div>
                    : null}
                    {this.props.movieNotFound && !this.state.reportingVisible && !this.state.searchVisible && !this.state.recommendVisible  ?
                            <div className="noMovie">
                                <p className={"text-center align-middle"}> WE COULD NOT FIND A FILM THAT MATCHES <br/> THE SEARCH CRITERIA </p>
                            </div>
                    : null}

            </div>
        );
    }
}
