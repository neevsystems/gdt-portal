import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import {getLogoutURL} from '../services/UserService';
export class RedirectToLogout extends Component {
  constructor( props ){
    super();
    this.state = { ...props };
  }
  componentWillMount(){
     console.log('Logout');
     getLogoutURL().then(function (response) {
        console.log(response);
        sessionStorage.removeItem('jwttoken');
        window.location =response.path;
      })
      .catch(function (error) {
        console.log(error);
      });



  }
  render(){
   return (<section>Redirecting...</section>);
  //return <Redirect to='/home' />;
  }
}

export default RedirectToLogout;