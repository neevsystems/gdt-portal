import axios from 'axios';
import {BASE_URL} from '../util/constants';
var token=sessionStorage.getItem('token');

export const getAllUsers=function () {
  axios.defaults.headers.common['authorization'] = token;
  let fullurl=BASE_URL+'allusers';
  let promise =axios({
    method:'get',
    url:fullurl
  })   
  return promise;
}


export const login=function () {
  //axios.defaults.headers.common['authorization'] = token;
  let userObj={
    "username":"sudhakar",
    "email":"sudhakar.vellanki@neevsystems.com",
    "password":"tech123"    
    };
  let fullurl=BASE_URL+'users/login';
  let promise =axios({
    method:'post',
    url:fullurl,
    data:userObj
  })   
  return promise;
}