import React from "react";
import Ratings from "./ratings";
import MovieInfo from "./movieinfo";
import {Streams} from "./streams";
import Buttons from "./buttons";
import Filters from "./filters";

export default class Skin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchVisible: false,
            menuVisible: false,
        }
    }

    toggleSearch = () => {
        this.setState({
            searchVisible: !this.state.searchVisible,
            menuVisible: false
        });
    }

    toggleMenu = () => {
        this.setState({
            menuVisible: !this.state.menuVisible,
            searchVisible: false
        });
    }

    toggleMenu = () => {
        let a = this.state.menuVisible;
        this.setState({
            menuVisible: !a,
            searchVisible: false
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


    render() {
        return (
            <div className="container-flex pt-4 pr-7 pl-7 skin">
                <Buttons getNextMovie={this.props.getNextMovie}
                         getPreviousMovie={this.props.getPreviousMovie}
                         toggleSearch={this.toggleSearch}
                         toggleMute={this.props.toggleMute}
                         mute={this.props.mute}
                         toggleMenu={this.toggleMenu.bind(this)}
                         searchVisible={this.state.searchVisible}
                         hideVideo={this.props.hideVideo}
                />
                {this.state.menuVisible && !this.state.searchVisible ? <div>Hello</div> : null}
                {this.state.searchVisible ? this.renderFilters() : null}
                {this.props.movieFound && !this.state.menuVisible && !this.state.searchVisible ?
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
                    {this.props.movieNotFound && !this.state.menuVisible && !this.state.searchVisible ?
                            <div className="noMovie">
                                <p className={"text-center align-middle"}> WE COULD NOT FIND A FILM THAT MATCHES <br/> THE SEARCH CRITERIA </p>
                            </div>
                    : null}

            </div>
        );
    }
}
