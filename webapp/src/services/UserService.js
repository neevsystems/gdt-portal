import axios from 'axios';
import {BASE_URL} from '../util/constants';

export const getLogoutURL=function() {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+sessionStorage.getItem('jwttoken');
    let fullurl=BASE_URL+'logout';
    let promise =axios({
      method:'get',
      url:fullurl
    })
    return promise;
  }

  export const getAccessDetails=(eid)=>{
    axios.defaults.headers.common['Authorization'] = 'Bearer '+sessionStorage.getItem('jwttoken');
    let fullurl=BASE_URL+'getuserAccessdetails/'+eid;
    let promise =axios({
      method:'get',
      url:fullurl
    })
    return promise;
  }