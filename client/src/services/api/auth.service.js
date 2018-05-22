import axios from 'axios';

export const AuthService = {
  register(username, password) {
    return axios.post('auth/register', { username: username, password: password });
  },
  login(username, password) {
    return axios.post('auth/login', { username: username, password: password });
  },
  getUserCurrent() {
    return axios.get('api/user/current');
  }
}
