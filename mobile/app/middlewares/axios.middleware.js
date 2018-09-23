import axios from 'axios';

export const client = axios.create({
  baseUrl: 'http://test.com',
  responseType: 'json'
});
