import { LessonsService } from '@/services/api/lessons.service';
var _ = require('lodash');

const state = {
  lessons: [],
  isLoadingLessons: false,
  editingLesson: null
};

const mutations = {
  setIsLoading(state, payload) {
    state.isLoadingLessons = payload.isLoadingLessons;
  },
  setLessons(state, payload) {
    state.lessons = payload.lessons;
  },
  cancelForm(state) {
    state.editingLesson = null;
  },
  editLesson(state, payload) {
    state.editingLesson = payload;
  },
  lessonCreated(state, payload) {
    state.lessons.push(payload.lesson);
  },
  lessonUpdated(state, payload) {
    const updatedLesson = state.lessons.find(lesson => lesson._id === payload.lesson._id);
    Object.assign(updatedLesson, payload.lesson);
    state.editingLesson = null;
  },
  deleteLesson(state, payload) {
    state.lessons.splice(state.lessons.findIndex(lesson => lesson._id === payload.lesson._id), 1);
  },
};

const actions = {
  fetchLessons(context, refresh = false) {
    if (state.lessons.length > 0 && !refresh) { return; }
    context.commit('setIsLoading', { isLoadingLessons: true });

    return LessonsService.getLessons()
      .then(response => {
        context.commit({ type: 'setLessons', lessons: response.data });
        return response;
      }).catch(error => {
        alert(error.response.data);
        return Promise.reject(error);
      }).finally(() => context.commit('setIsLoading', { isLoadingLessons: false }));
  },
  createLesson(context, input) {
    context.commit('setIsLoading', { isLoadingLessons: true });

    LessonsService.createLesson(input)
      .then(response => {
        context.commit({ type: 'lessonCreated', lesson: response.data });
        return response;
      }).catch(error => {
        alert(error.response.data);
        return Promise.reject(error);
      }).finally(() => context.commit('setIsLoading', { isLoadingLessons: false }));
  },
  updateLesson(context, input) {
    context.commit('setIsLoading', { isLoadingLessons: true });
    const lessonId = context.state.editingLesson._id;
    LessonsService.updateLesson(lessonId, input)
      .then(response => {
        context.commit({ type: 'lessonUpdated', lesson: response.data });
        return response;
      }).catch(error => {
        alert(error.response.data);
        return Promise.reject(error);
      }).finally(() => context.commit('setIsLoading', { isLoadingLessons: false }));
  },
  deleteLesson(context, lessonId) {
    const result = confirm('Delete this ?');
    if (result) {
      context.commit('setIsLoading', { isLoadingLessons: true });
      LessonsService.deleteLesson(lessonId)
        .then((response) => {
          context.commit({ type: 'deleteLesson', lesson: response.data });
          return response;
        }).catch(error => {
          alert(error.response.data);
          return Promise.reject(error);
        }).finally(() => context.commit('setIsLoading', { isLoadingLessons: false }));
    }
  }
}

const getters = {
  inputForm: state => state.editingLesson ? Object.assign({}, state.editingLesson) : { index: "", bookName: "" },
  sortedBooks: state => {
    if (state.lessons === []) { return []; }

    const books = _.groupBy(state.lessons, 'bookName');
    return Object.entries(books).map(([key, value]) => ({bookName: key, lessons: value}));
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
