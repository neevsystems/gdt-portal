import axios from 'axios';
import {BASE_URL} from '../util/constants';
var token=sessionStorage.getItem('token');

export const getAllDocuments= function(ffor,ffrom) {
  axios.defaults.headers.common['authorization'] = token;
  let fullurl=BASE_URL+'alldocumentsbyuser/'+ffor+'/'+ffrom;
  let promise =axios({
    method:'get',
    url:fullurl
  })   
  return promise;
};
export const archivedFile= function(fid) {
  axios.defaults.headers.common['authorization'] = token;
  let fullurl=BASE_URL+'archivefile/'+fid;
  let promise =axios({
    method:'get',
    url:fullurl
  })   
  return promise;
};
export const getDocument=function (id) {
  axios.defaults.headers.common['Authorization'] ='Bearer '+sessionStorage.getItem('jwttoken');
  let fullurl=BASE_URL+'downloadFile/'+id;
  let promise =axios({
    method:'get',
    url:fullurl
  })
  return promise;
}

export const saveDocument= function(bodyFormData){
  axios.defaults.headers.common['authorization'] = token;
  //axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  let fullurl=BASE_URL+'fileupload';
  let promise =axios({
    method: 'post',
    url: fullurl,
    data: bodyFormData
  });
    
    return promise;        
}