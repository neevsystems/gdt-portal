import axios from 'axios';
import {BASE_URL} from '../util/constants';
export default function getLogoutURL() {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+sessionStorage.getItem('jwttoken');
    let fullurl=BASE_URL+'logout';
    let promise =axios({
      method:'get',
      url:fullurl
    })
    return promise;
  }