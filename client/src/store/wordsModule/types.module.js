import { WordsService } from '@/services/api/words.service';
import { defaultWord } from '@/models/word';

const state = {
  lessonsWithVerbs: [],
  lessonsWithSurus: [],
  lessonsWithAdjs: [],
  lessonsWithExpressionsAndAdverbs: [],
};

const mutations = {
  setVerbs(state, payload) {
    state.lessonsWithVerbs = payload.lessonsWithVerbs;
  },
  setSurus(state, payload) {
    state.lessonsWithSurus = payload.lessonsWithSurus;
  },
  setAdjs(state, payload) {
    state.lessonsWithAdjs = payload.lessonsWithAdjs;
  },
  setExpressionsAndAdverbs(state, payload) {
    state.lessonsWithExpressionsAndAdverbs = payload.lessonsWithExpressionsAndAdverbs;
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
  fetchSurus(context, refresh = false) {
    if (state.lessonsWithSurus.length > 0 && !refresh) { return; }

    context.commit('loading', null, { root: true });
    WordsService.getSurus()
      .then((response) => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'setSurus', lessonsWithSurus: response.data });
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
      });
  },
  fetchExpressionsAndAdverbs(context, refresh = false) {
    if (state.lessonsWithExpressionsAndAdverbs.length > 0 && !refresh) { return; }

    context.commit('loading', null, { root: true });
    WordsService.getExpressionsAndAdverbs()
      .then((response) => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'setExpressionsAndAdverbs', lessonsWithExpressionsAndAdverbs: response.data });
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
      });
  },
  fetchAdjs(context, refresh = false) {
    if (state.lessonsWithAdjs.length > 0 && !refresh) { return; }

    context.commit('loading', null, { root: true });
    WordsService.getAdjs()
      .then((response) => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'setAdjs', lessonsWithAdjs: response.data });
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
      });
  },
}

const getters = {
  totalVerbs: (state) => state.lessonsWithVerbs.reduce((sum, lesson) => sum += lesson.words.length, 0),
  totalAdjs: (state) => {
    return state.lessonsWithAdjs.reduce((sum, lesson) => {
      return sum += lesson.iAdjs.length + lesson.naAdjs.length
    }, 0);
  },
  totalSurus: (state) => state.lessonsWithSurus.reduce((sum, lesson) => sum += lesson.words.length, 0),
  totalExpressionsAndAdverbs: (state) => state.lessonsWithExpressionsAndAdverbs.reduce((sum, lesson) => sum += lesson.words.length, 0),
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
