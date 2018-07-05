import { WordsService } from '@/services/api/words.service';
import { defaultWord } from '@/models/word';
import typesModule from './wordsModule/types.module';
import { popAlert } from '@/functions/alert';

const state = {
  words: [],
  isLoadingWords: false,
  editingWord: null,
  selectingLessonId: null
};

const mutations = {
  setIsLoading(state, payload) {
    state.isLoadingWords = payload.isLoadingWords;
  },
  setSelectingLessonId(state, payload) {
    state.selectingLessonId = payload.selectingLessonId;
  },
  setWords(state, payload) {
    state.words = payload.words;
  },
  cancelForm(state) {
    state.editingWord = null;
  },
  editWord(state, payload) {
    state.editingWord = payload;
  },
  wordCreated(state, payload) {
    if (payload.word.lesson === state.selectingLessonId) {
      state.words.push(payload.word);
    }
  },
  wordUpdated(state, payload) {
    if (payload.word.lesson === state.selectingLessonId) {
      const updatedWord = state.words.find(word => word._id === payload.word._id);
      Object.assign(updatedWord, payload.word);
    } else {
      state.words.splice(state.words.findIndex(word => word._id === payload.word._id), 1);
    }
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
      popAlert(this, error);
      return Promise.reject(error);
    }
  },
  changeLesson(context, lessonId) {
    context.commit('setSelectingLessonId', { selectingLessonId: lessonId });
    context.dispatch('getWords');
  },
  getWords(context) {
    context.commit('setIsLoading', { isLoadingWords: true });
    WordsService.getWords(context.state.selectingLessonId)
      .then((response) => {
        context.commit({ type: 'setWords', words: response.data });
      }).catch(error => {
        popAlert(this, error);
      }).finally(() => context.commit('setIsLoading', { isLoadingWords: false }));
  },
  createWord(context, input) {
    context.commit('setIsLoading', { isLoadingWords: true });

    WordsService.createWord(input)
      .then(response => {
        context.commit({ type: 'wordCreated', word: response.data });
      }).catch(error => {
        popAlert(this, error);
      }).finally(() => context.commit('setIsLoading', { isLoadingWords: false }));
  },
  updateWord(context, input) {
    context.commit('setIsLoading', { isLoadingWords: true });
    const wordId = context.state.editingWord._id;
    WordsService.updateWord(wordId, input)
      .then(response => {
        context.commit({ type: 'wordUpdated', word: response.data });
      }).catch(error => {
        popAlert(this, error);
      }).finally(() => context.commit('setIsLoading', { isLoadingWords: false }));
  },
  deleteWord(context, wordId) {
    const result = confirm('Delete this ?');
    if (result) {
      context.commit('setIsLoading', { isLoadingWords: true });
      WordsService.deleteWord(wordId)
        .then((response) => {
          context.commit({ type: 'deleteWord', word: response.data });
        }).catch(error => {
          popAlert(this, error);
        }).finally(() => context.commit('setIsLoading', { isLoadingWords: false }));
    }
  }
}

const getters = {
  inputForm: state => state.editingWord ? Object.assign({}, state.editingWord) : { ...defaultWord, lesson: state.selectingLessonId }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules: {
    typesModule
  }
};
