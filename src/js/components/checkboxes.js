import React from "react";

export class Checkbox extends React.Component{

  render() {
    return (
      <div className="col-12">
        <label>
           <input type="checkbox" checked={this.props.checked} value={this.props.value}
                  onChange={e => this.props.toggle(this.props.id, this.props.value)}/>
           <span>{this.props.value}</span>
        </label>
      </div>
    );
  }
};


export class CheckboxForm extends React.Component {

  render() {
    return (
      <div className="checkbox-form checkbox-container">
        {
          this.props.filters.map(a => {
            return <Checkbox value={a.value} checked={a.checked} id={this.props.id} toggle={this.props.toggle}/>
          })
        }
      </div>
    )
  }

}
