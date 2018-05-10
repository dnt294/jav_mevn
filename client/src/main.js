// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

/** Import directives */
import { Focus } from './directives/directive.module';

/** Config for axios  */
axios.defaults.baseURL = process.env.BACKEND_ENDPOINT;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
