import { LessonsService } from '@/services/api/lessons.service';

const state = {
  lessons: [],
  editingLesson: null
};

const mutations = {
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
    context.commit('loading', null, { root: true });

    return LessonsService.getLessons()
      .then(response => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'setLessons', lessons: response.data });
        return response;
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
        return Promise.reject(error);
      });
  },
  createLesson(context, input) {
    context.commit('loading', null, { root: true });

    LessonsService.createLesson(input)
      .then(response => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'lessonCreated', lesson: response.data });
        return response;
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
        return Promise.reject(error);
      });
  },
  updateLesson(context, input) {
    context.commit('loading', null, { root: true });
    const lessonId = context.state.editingLesson._id;
    LessonsService.updateLesson(lessonId, input)
      .then(response => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'lessonUpdated', lesson: response.data });
        return response;
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
        return Promise.reject(error);
      });
  },
  deleteLesson(context, lessonId) {
    const result = confirm('Delete this ?');
    if (result) {
      context.commit('loading', null, { root: true });
      LessonsService.deleteLesson(lessonId)
        .then((response) => {
          context.commit('notLoading', null, { root: true });
          context.commit({ type: 'deleteLesson', lesson: response.data });
          return response;
        }).catch(error => {
          context.commit('notLoading', null, { root: true });
          alert(error.response.data);
          return Promise.reject(error);
        });
    }
  }
}

const getters = {
  inputForm: state => state.editingLesson ? Object.assign({}, state.editingLesson) : { index: "", bookName: "" }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
