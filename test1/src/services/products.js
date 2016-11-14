import request from '../utils/request';
import qs from 'qs';

const ip = "192.168.2.191";
const port="8080";
export async function queryDevices(){
  return request(`http://${ip}:${port}/JfinalTest/record/`,{mod:'no-cors'});
}

export async function querySblx(){
  return request(`http://${ip}:${port}/JfinalTest/record/sblxs/`,{mod:'no-cors'});
}
export async function queryOrgs(){
  return request(`http://${ip}:${port}/JfinalTest/record/orgs/`,{mod:'no-cors'});
}
export async function queryExcelData(){
  return request(`http://${ip}:${port}/JfinalTest/record/readexcel/`,{mod:'no-cors'});
}
export async function searchByPayload(params){
  params = {...params,orgid:params.orgid[params.orgid.length-1],sblxcode:params.sblxcode[params.sblxcode.length-1]}
  return request(`http://${ip}:${port}/JfinalTest/record/?${qs.stringify(params)}`);
}
