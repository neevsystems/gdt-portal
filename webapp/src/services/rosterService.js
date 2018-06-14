import axios from 'axios';
import {BASE_URL,token} from '../util/constants';


export default function getAllUsers() {
  axios.defaults.headers.common['authorization'] = token;
  let fullurl=BASE_URL+'allusers';
  let promise =axios({
    method:'get',
    url:fullurl
  })   
  return promise;
}