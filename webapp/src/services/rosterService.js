import axios from 'axios';
import {BASE_URL} from '../util/constants';
var token=sessionStorage.getItem('jwttoken');

export const getAllUsers=function () {
  axios.defaults.headers.common['Authorization'] ='Bearer '+sessionStorage.getItem('jwttoken');
  let fullurl=BASE_URL+'allusers';
  let promise =axios({
    method:'get',
    url:fullurl
  })
  return promise;
}
export const getUser=function (id) {
  axios.defaults.headers.common['Authorization'] ='Bearer '+sessionStorage.getItem('jwttoken');
  let fullurl=BASE_URL+'user/'+id;
  let promise =axios({
    method:'get',
    url:fullurl
  })
  return promise;
}

export const getDomains=function (eid) {
  axios.defaults.headers.common['Authorization'] ='Bearer '+sessionStorage.getItem('jwttoken');
  let fullurl=BASE_URL+'getdomains/'+eid;
  let promise =axios({
    method:'get',
    url:fullurl
  })
  return promise;
}

export const getCompanies=function (sysid,eid) {
  axios.defaults.headers.common['Authorization'] ='Bearer '+sessionStorage.getItem('jwttoken');
  let fullurl=BASE_URL+'getcompanies/'+sysid+'/'+eid;
  let promise =axios({
    method:'get',
    url:fullurl
  })
  return promise;
}

export const createUser=function (userObj) {
  axios.defaults.headers.common['Authorization'] ='Bearer '+sessionStorage.getItem('jwttoken');
  let fullurl=BASE_URL+'user/';
  let promise =axios({
    method:'POST',
    url:fullurl,
    data: userObj
  })
  return promise;
}
export const updateUser=function (userObj) {
  axios.defaults.headers.common['Authorization'] ='Bearer '+sessionStorage.getItem('jwttoken');
  let fullurl=BASE_URL+'users/';
  let promise =axios({
    method:'PUT',
    url:fullurl,
    data: userObj
  })
  return promise;
}


export const login=function () {
  //axios.defaults.headers.common['authorization'] = token;
  let userObj={
    "username":"venkat",
    "email":"sudhakar.v@neevsystems.com",
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