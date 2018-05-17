import { WordsService } from '@/services/api/words.service';
import { defaultWord } from '@/models/word';

const state = {
  lessonsWithVerbs: [],
  lessonsWithSurus: [],
  lessonsWithAdjs: [],
  lessonsWithElses: [],
  isLoadingVerbs: false,
  isLoadingSurus: false,
  isLoadingAdjs: false,
  isLoadingElses: false
};

const mutations = {
  setIsLoadingVerbs(state, payload) {
    state.isLoadingVerbs = payload.isLoadingVerbs;
  },
  setIsLoadingSurus(state, payload) {
    state.isLoadingSurus = payload.isLoadingSurus;
  },
  setIsLoadingAdjs(state, payload) {
    state.isLoadingAdjs = payload.isLoadingAdjs;
  },
  setIsLoadingElses(state, payload) {
    state.isLoadingElses = payload.isLoadingElses;
  },
  setVerbs(state, payload) {
    state.lessonsWithVerbs = payload.lessonsWithVerbs;
  },
  setSurus(state, payload) {
    state.lessonsWithSurus = payload.lessonsWithSurus;
  },
  setAdjs(state, payload) {
    state.lessonsWithAdjs = payload.lessonsWithAdjs;
  },
  setElses(state, payload) {
    state.lessonsWithElses = payload.lessonsWithElses;
  }
};

const actions = {
  fetchVerbs(context, refresh = false) {
    if (state.lessonsWithVerbs.length > 0 && !refresh) { return; }

    context.commit('setIsLoadingVerbs', { isLoadingVerbs: true });
    WordsService.getVerbs()
      .then((response) => {
        context.commit({ type: 'setVerbs', lessonsWithVerbs: response.data });
      }).catch(error => {
        alert(error.response.data);
      }).finally(() => context.commit('setIsLoadingVerbs', { isLoadingVerbs: false }));
  },
  fetchSurus(context, refresh = false) {
    if (state.lessonsWithSurus.length > 0 && !refresh) { return; }

    context.commit('setIsLoadingSurus', { isLoadingSurus: true });
    WordsService.getSurus()
      .then((response) => {
        context.commit({ type: 'setSurus', lessonsWithSurus: response.data });
      }).catch(error => {
        alert(error.response.data);
      }).finally(() => context.commit('setIsLoadingSurus', { isLoadingSurus: false }));
  },
  fetchElses(context, refresh = false) {
    if (state.lessonsWithElses.length > 0 && !refresh) { return; }

    context.commit('setIsLoadingElses', { isLoadingElses: true });
    WordsService.getElses()
      .then((response) => {
        context.commit({ type: 'setElses', lessonsWithElses: response.data });
      }).catch(error => {
        alert(error.response.data);
      }).finally(() => context.commit('setIsLoadingElses', { isLoadingElses: false }));
  },
  fetchAdjs(context, refresh = false) {
    if (state.lessonsWithAdjs.length > 0 && !refresh) { return; }

    context.commit('setIsLoadingAdjs', { isLoadingAdjs: true });
    WordsService.getAdjs()
      .then((response) => {
        context.commit({ type: 'setAdjs', lessonsWithAdjs: response.data });
      }).catch(error => {
        alert(error.response.data);
      }).finally(() => context.commit('setIsLoadingAdjs', { isLoadingAdjs: false }));
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
  totalElses: (state) => state.lessonsWithElses.reduce((sum, lesson) => sum += lesson.words.length, 0),
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
