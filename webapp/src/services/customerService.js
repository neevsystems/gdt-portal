import axios from 'axios';
import {BASE_URL} from '../util/constants';
var token=sessionStorage.getItem('jwttoken');

export const getAllCustomers=function () {
    axios.defaults.headers.common['Authorization'] ='Bearer '+sessionStorage.getItem('jwttoken');
    let fullurl=BASE_URL+'allcustomers';
    let promise =axios({
      method:'get',
      url:fullurl
    })
    return promise;
  }