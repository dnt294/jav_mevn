import Vue from 'vue';
import Vuex from 'vuex';

import pingModule from './ping.module';
import lessonsModule from './lessons.module';
import wordsModule from './words.module';
import tagsModule from './tags.module';

import { WordsService } from '@/services/api/words.service';
import { AuthService } from '@/services/api/auth.service';

Vue.use(Vuex);

const state = {
  isLoading: false,
  searchResults: [],
  currentUsername: null,
  isAuthenticating: false
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
  setIsAuthenticating(state, payload) {
    state.isAuthenticating = payload.isAuthenticating;
  },
  setCurrentUser(state, payload) {
    state.currentUsername = payload.username;
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
  },
  register(context, input) {
    context.commit('setIsAuthenticating', { isAuthenticating: true });

    return AuthService.register(input.username, input.password)
      .then(response => {
        context.commit({ type: 'setCurrentUser', username: response.data.username });
        return response;
      }).catch(error => {
        alert(error.response.data);
        return Promise.reject(error);
      }).finally(() => context.commit('setIsAuthenticating', { isAuthenticating: false }));
  },
  login(context, input) {
    context.commit('setIsAuthenticating', { isAuthenticating: true });

    return AuthService.login(input.username, input.password)
      .then(response => {
        context.commit({ type: 'setCurrentUser', username: response.data.username });
        return response;
      }).catch(error => {
        alert(error.response.data.message);
        return Promise.reject(error);
      }).finally(() => context.commit('setIsAuthenticating', { isAuthenticating: false }));
  },
  userCurrent(context) {
    context.commit('setIsAuthenticating', { isAuthenticating: true });
    return AuthService.getUserCurrent()
      .then(response => {
        context.commit({ type: 'setCurrentUser', username: response.data.username });
        return response;
      }).catch(error => {
        return Promise.reject(error);
      }).finally(() => context.commit('setIsAuthenticating', { isAuthenticating: false }));
  }
};

const getters = {
  isLoggedIn: state => !!state.currentUsername
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    pingModule,
    lessonsModule,
    tagsModule,
    wordsModule,
  }
});
