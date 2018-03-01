// module for client to consume api / web services
import axios from 'axios';

const BASE_URL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type' : 'application/json'
  }
})

export function getBars(location){
  return client.get(`/bar?location=${location}`);
}

export function getBarById(id){
  return client.get(`/api/bar/${id}`);
}

export function createBarAttendee(id,uid,email){
  return client.post(`/api/bar/${id}`,{
    uid: uid,
    name: email
  });
}

export function createNewBar(bar_id,uid,name){
  return client.post(`/api/bar`,{
    bar_id: bar_id,
    uid: uid,
    name: name
  });
}

export function deleteBarAttendee(barid,userid){
  return client.delete(`/api/bar/${barid}\/attendee\/${userid}`);
}
