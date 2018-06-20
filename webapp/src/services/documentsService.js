import axios from 'axios';
import {BASE_URL} from '../util/constants';
var token=sessionStorage.getItem('token');

export const getAllDocuments= function() {
  axios.defaults.headers.common['authorization'] = token;
  let fullurl=BASE_URL+'alldocuments';
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