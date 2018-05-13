import { WordsService } from '@/services/api.service';
import { defaultWord } from '@/models/word';

const state = {
  words: [],
  isShowCreateForm: false,
  editingWord: null,
  selectingLessonId: null
};

const mutations = {
  setSelectingLessonId(state, payload) {
    state.selectingLessonId = payload.selectingLessonId;
  },
  setWords(state, payload) {
    state.words = payload.words;
  },
  cancelForm(state) {
    state.isShowCreateForm = false;
    state.editingWord = null;
  },
  newWord(state) {
    state.isShowCreateForm = true;
  },
  editWord(state, payload) {
    state.editingWord = payload;
  },
  wordCreated(state, payload) {
    state.words.push(payload.word);
    state.isShowCreateForm = false;
  },
  wordUpdated(state, payload) {
    const updatedWord = state.words.find(word => word._id === payload.word._id);
    Object.assign(updatedWord, payload.word);
    state.editingWord = null;
  },
  deleteWord(state, payload) {
    state.words.splice(state.words.findIndex(word => word._id === payload.word._id), 1);
  },
};

const actions = {
  async fetchFirstWords(context) {
    try {
      await context.dispatch('lessonsModule/fetchLessons', null, { root: true });

      if (context.rootState.lessonsModule.lessons.length === 0) { return; }
      context.dispatch('changeLesson', context.rootState.lessonsModule.lessons[0]._id);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  changeLesson(context, lessonId) {
    context.commit('setSelectingLessonId', { selectingLessonId: lessonId });
    context.dispatch('getWords');
  },
  getWords(context) {
    context.commit('loading', null, { root: true });
    WordsService.getWords(context.state.selectingLessonId)
      .then((response) => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'setWords', words: response.data });
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
      });
  },
  createWord(context, input) {
    context.commit('loading', null, { root: true });
    const params = Object.assign({}, input, { lesson: context.state.selectingLessonId });
    WordsService.createWord(params)
      .then(response => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'wordCreated', word: response.data });
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
      });
  },
  updateWord(context, input) {
    context.commit('loading', null, { root: true });
    const wordId = context.state.editingWord._id;
    WordsService.updateWord(wordId, input)
      .then(response => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'wordUpdated', word: response.data });
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
      });
  },
  deleteWord(context, wordId) {
    const result = confirm('Delete this ?');
    if (result) {
      context.commit('loading', null, { root: true });
      WordsService.deleteWord(wordId)
        .then((response) => {
          context.commit('notLoading', null, { root: true });
          context.commit({ type: 'deleteWord', word: response.data });
        }).catch(error => {
          context.commit('notLoading', null, { root: true });
          alert(error.response.data);
        });
    }
  }
}

const getters = {
  inputForm: state => state.editingWord ? Object.assign({}, state.editingWord) : defaultWord
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
