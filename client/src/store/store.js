import Vue from 'vue';
import Vuex from 'vuex';

import lessonsModule from './lessons.module';
import wordsModule from './words.module';

Vue.use(Vuex);

const state = {
  isLoading: false
};

const mutations = {
  loading(state) {
    state.isLoading = true;
  },
  notLoading(state) {
    state.isLoading = false;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    lessonsModule,
    wordsModule
  }
});
