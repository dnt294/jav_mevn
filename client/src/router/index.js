import Vue from 'vue';
import Router from 'vue-router';

import lessons from '@/components/lessons/index/lessons';
import words from '@/components/words/index/words';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/lessons', component: lessons },
    { path: '/words', component: words },
  ],
});
