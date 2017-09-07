import React from "react";

export class Checkbox extends React.Component{
    
  constructor() {
    super();
    this.state = {
      checked: true
    }
  }
  
  onClick() {
      this.setState({checked: !this.state.checked});
      this.props.wanted[this.props.value] = !this.props.wanted[this.props.value];
      console.log(this.props.wanted);
  };
  
  render() {
    return (
      <label class='searchbox'  >
        <input  type="checkbox" 
          checked={this.state.checked}
          onClick={this.onClick.bind(this)}
          value={this.props.value} 
           /> {this.props.value}
           </label>
    );
  }
}   

            
export class Search extends React.Component {

  constructor() {
    super();
        
    
  }
  
  render() {    
    return (
      <div class='searchCriteria'>
        <div class='searchgroup'>
          <p class='filterTitle'> STREAMS </p>
          <div class='scrollbox' >
            <Checkbox value={this.props.stream[0]} wanted={this.props.streamWanted}/>
            <Checkbox value={this.props.stream[1]} wanted={this.props.streamWanted}/>
            <Checkbox value={this.props.stream[2]} wanted={this.props.streamWanted}/>
          </div>
        </div>
        <div class='searchgroup'>
          <p class='filterTitle'> LANGUAGE </p>
          <div class='scrollbox'>
            <Checkbox value={this.props.language[0]} wanted={this.props.languageWanted}/>
            <Checkbox value={this.props.language[1]} wanted={this.props.languageWanted}/>
            <Checkbox value={this.props.language[2]} wanted={this.props.languageWanted}/>
            <Checkbox value={this.props.language[3]} wanted={this.props.languageWanted}/>
            <Checkbox value={this.props.language[4]} wanted={this.props.languageWanted}/>
            <Checkbox value={this.props.language[5]} wanted={this.props.languageWanted}/>
            <Checkbox value={this.props.language[6]} wanted={this.props.languageWanted}/>
            <Checkbox value={this.props.language[7]} wanted={this.props.languageWanted}/>
            <Checkbox value={this.props.language[8]} wanted={this.props.languageWanted}/>
          </div>  
        </div>  
        <div class='searchgroup'>
          <p class='filterTitle'> GENRE </p>
          <div class='scrollbox'>
            <Checkbox value={this.props.genre[0]} wanted={this.props.genreWanted}/>
            <Checkbox value={this.props.genre[1]} wanted={this.props.genreWanted}/>
            <Checkbox value={this.props.genre[2]} wanted={this.props.genreWanted}/>
            <Checkbox value={this.props.genre[3]} wanted={this.props.genreWanted}/>
            <Checkbox value={this.props.genre[4]} wanted={this.props.genreWanted}/>
            <Checkbox value={this.props.genre[5]} wanted={this.props.genreWanted}/>
          </div>
        </div>  
     </div>       
    );
  }
}

          <Search stream={this.state.stream} streamWanted={this.state.streamWanted} language={this.state.language} languageWanted={this.state.languageWanted} genre={this.state.genre} genreWanted={this.state.genreWanted}/>