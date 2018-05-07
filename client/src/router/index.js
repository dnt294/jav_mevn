import Vue from 'vue';
import Router from 'vue-router';

import Lessons from '@/components/lessons/index/Lessons';
import words from '@/components/words/index/words';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/lessons', component: Lessons },
    { path: '/words', component: words },
  ],
});
