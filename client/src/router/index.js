import Vue from 'vue';
import Router from 'vue-router';

import lessons from '@/components/lessons/index/lessons';
import words from '@/components/words/index/words';
import tags from '@/components/tags/index/tags';
import verbs from '@/components/words/verbs/verbs';
import surus from '@/components/words/surus/surus';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/lessons', component: lessons },
    { path: '/words', component: words },
    { path: '/words/verbs', component: verbs },
    { path: '/words/surus', component: surus },
    { path: '/tags', component: tags },
  ],
});
