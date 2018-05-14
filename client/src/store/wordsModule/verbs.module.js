import { WordsService } from '@/services/api.service';
import { defaultWord } from '@/models/word';

const state = {
  lessonsWithVerbs: []
};

const mutations = {
  setVerbs(state, payload) {
    state.lessonsWithVerbs = payload.lessonsWithVerbs;
  }
};

const actions = {
  fetchVerbs(context, refresh = false) {
    if (state.lessonsWithVerbs.length > 0 && !refresh) { return; }

    context.commit('loading', null, { root: true });
    WordsService.getVerbs()
      .then((response) => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'setVerbs', lessonsWithVerbs: response.data });
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
      });
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
