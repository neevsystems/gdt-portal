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
  }
  render(){
    return <Redirect to='/home' />;
  }
}

export default SSOHandler;