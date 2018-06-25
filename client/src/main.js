// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('admin-lte');

import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

/** Import directives */
import { Focus } from './directives/directive.module';

/** Config for axios  */
axios.defaults.baseURL = process.env.BACKEND_ENDPOINT;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(request => {
  console.log('start request: ', `${request.baseURL}/${request.url}`);
  return request;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

$('ul').tree({
  accordion: true,
  followLink: true
});
