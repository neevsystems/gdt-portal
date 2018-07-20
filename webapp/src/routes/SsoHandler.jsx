import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
export class SSOHandler extends Component {
  constructor( props ){
    super();
    this.state = { ...props };
  }
  componentWillMount(){
    const { match: { params } } = this.props;
    sessionStorage.setItem('jwttoken',params.token);
    sessionStorage.setItem('email',params.email);
  }
  render(){
    return <Redirect to='/home' />;
  }
}

export default SSOHandler;