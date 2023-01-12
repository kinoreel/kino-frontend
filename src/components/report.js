import React from "react";
import {Checkbox} from "./checkboxes";

export default class Report extends React.Component {

    constructor() {
        super();
        this.state = {
            reasons: [
                {value: "The film or trailer looks shit", checked: false},
                {value: "The trailer is incorrect", checked: false},
                {value: "The stream is incorrect", checked: false},
                {value: "The film is kind of bait", checked: false},
            ],
        }
    }

    stopPropagation = (e) => {
        e.stopPropagation();
    }


    toggleCheckbox = (id, value) => {
        let reasons = this.state.reasons

        reasons.map(function (a) {
            if (a.value == value) {
                a.checked = !a.checked
            } else {
                a.checked = false
            }
        })
        this.setState({reasons: reasons});
    }

    onClick = () => {
        this.props.toggleReporting()
        this.props.getNextMovie()
    }

    render() {
        return (
            <div onClick={this.stopPropagation.bind(this)} className="report">
                <div className={"row"}>
                    <div className={"col-4 pr-4"}></div>
                    <div className={"col-4 pl-5 ml-5"}>
                        <div className={"col-12"}>
                            <p className={"report-title"}>REPORT FILM </p>
                        </div>
                        <div className={"checkbox-form"}>
                        {
                            this.state.reasons.map(a => {
                                return <Checkbox value={a.value} checked={a.checked} id="reasons" toggle={this.toggleCheckbox.bind(this)}/>
                            })
                        }
                        </div>
                        {this.state.reasons.reduce((oneSelected, e) => e.checked || oneSelected, false) ?
                            <div className={"col-12 pt-3 mt-2"}>
                                <p className={"report-submit"} onClick={this.onClick.bind(this)}>SUBMIT</p>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        )
    }
};
