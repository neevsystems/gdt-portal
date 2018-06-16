import React, { Component } from "react";

export class RedirectToLogin extends Component {
  constructor( props ){
    super();
    this.state = { ...props };
  }
  componentWillMount(){
    window.location = 'http://localhost:3001/login';
  }
  render(){
    return (<section>Redirecting...</section>);
  }
}

export default RedirectToLogin;