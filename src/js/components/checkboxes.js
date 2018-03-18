import React from "react";

export class Checkbox extends React.Component{

  render() {
    return (
      <div class="checkbox">
        <label>
           <input
              type="checkbox"
              checked={this.props.checked}
              value={this.props.value}
              onChange={e => this.props.toggle(this.props.CheckboxTable, this.props.value)}
           />
           <span>{this.props.value}</span>
        </label>
      </div>
    );
  }
};

export class CheckboxTable extends React.Component {

  render() {
    return (
      <div class="checkboxTable">
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              checked={this.props.allFiltersChecked(this.props.CheckboxTable)}
              value="A L L"
              onChange={e => this.props.toggleAll(this.props.CheckboxTable)}
            />
          </label>
        </div>
        {
          this.props.filters.map(a => {
            return <Checkbox value={a.value} checked={a.checked} CheckboxTable = {this.props.CheckboxTable} toggle={this.props.toggle}/>
          })
        }
      </div>
    )
  }
}