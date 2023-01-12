import React from "react";

export default class Recommend extends React.Component {

    stopPropagation = (e) => {
        e.stopPropagation();
    }

    onClick = () => {
        this.props.toggleRecommend()
    }

    render() {
        return (
            <div className="report">
                <div className={"row"}>
                    <div className={"col-4 pr-4"}></div>
                    <div className={"col-4 pl-5 ml-5"}>
                        <div className={"col-12"}>
                            <p className={"report-title"}>RECOMMEND FILM </p>
                        </div>
                        <div className={"col-12 pt-3 mt-2"} onClick={this.stopPropagation.bind(this)}>
                            <p className={"report-submit"} onClick={this.onClick.bind(this)}>SUBMIT</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
