import Vue from 'vue';
import Vuex from 'vuex';

import lessonsModule from './lessons.module';
import wordsModule from './words.module';
import tagsModule from './tags.module';

import { WordsService } from '@/services/api/words.service';

Vue.use(Vuex);

const state = {
  isLoading: false,
  searchResults: [],
};

const mutations = {
  loading(state) {
    state.isLoading = true;
  },
  notLoading(state) {
    state.isLoading = false;
  },
  updateSearchResults(state, payload) {
    state.searchResults = payload.searchResults;
    $('#searchModal').modal('show');
  },
};

const actions = {
  search(context, keyword) {
    if (keyword.trim() === "") { alert("Nhập Keyword !"); return; }

    context.commit('loading');
    WordsService.search(keyword)
      .then((response) => {
        context.commit('updateSearchResults', { searchResults: response.data });
      }).catch(error => {
        alert(error.response.data);
      }).finally(() => context.commit('notLoading'));
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    lessonsModule,
    tagsModule,
    wordsModule
  }
});
