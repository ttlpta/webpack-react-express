import React, { Component } from 'react';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : 'tuan anh'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange}/>
        <h1>hello {this.state.name}</h1>
      </div>
    );
  }
}