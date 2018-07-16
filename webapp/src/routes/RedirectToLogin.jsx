import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
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
  //return <Redirect to='/home' />;
  }
}

export default RedirectToLogin;