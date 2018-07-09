import axios from 'axios';
import {BASE_URL} from '../util/constants';

export const getOpenTickets=function(eid) {
  axios.defaults.headers.common['Authorization'] = 'Bearer '+sessionStorage.getItem('jwttoken');
  let fullurl=BASE_URL+'openTickets/'+eid;
  let promise =axios({
    method:'get',
    url:fullurl
  })
  return promise;
}
export const getResolvedTickets=function(eid) {
    axios.defaults.headers.common['Authorization'] = 'Bearer '+sessionStorage.getItem('jwttoken');
    let fullurl=BASE_URL+'resolvedTickets/'+eid;
    let promise =axios({
      method:'get',
      url:fullurl
    })
    return promise;
  }