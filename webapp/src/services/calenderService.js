import axios from 'axios';
import {BASE_URL,token} from '../util/constants';


export default function getAllEvents() {
  axios.defaults.headers.common['authorization'] = token;
  let fullurl=BASE_URL+'allevents';
  let promise =axios({
    method:'get',
    url:fullurl
  })   
  return promise;
}