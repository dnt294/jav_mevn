import { TagsService } from '@/services/api.service';

const state = {
  tags: [],
  isShowCreateForm: false,
  editingTag: null
};

const mutations = {
  setTags(state, payload) {
    state.tags = payload.tags;
  },
  cancelForm(state) {
    state.isShowCreateForm = false;
    state.editingTag = null;
  },
  newTag(state) {
    state.isShowCreateForm = true;
  },
  editTag(state, payload) {
    state.editingTag = payload;
  },
  tagCreated(state, payload) {
    state.tags.push(payload.tag);
    state.isShowCreateForm = false;
  },
  tagUpdated(state, payload) {
    const updatedTag = state.tags.find(tag => tag._id === payload.tag._id);
    Object.assign(updatedTag, payload.tag);
    state.editingTag = null;
  },
  deleteTag(state, payload) {
    state.tags.splice(state.tags.findIndex(tag => tag._id === payload.tag._id), 1);
  },
};

const actions = {
  getTags(context) {
    context.commit('loading', null, { root: true });
    return TagsService.getTags()
      .then(response => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'setTags', tags: response.data });
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
      });
  },
  createTag(context, input) {
    context.commit('loading', null, { root: true });
    TagsService.createTag(input)
      .then(response => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'tagCreated', tag: response.data });
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
      });
  },
  updateTag(context, input) {
    context.commit('loading', null, { root: true });
    const tagId = context.state.editingTag._id;
    TagsService.updateTag(tagId, input)
      .then(response => {
        context.commit('notLoading', null, { root: true });
        context.commit({ type: 'tagUpdated', tag: response.data });
      }).catch(error => {
        context.commit('notLoading', null, { root: true });
        alert(error.response.data);
      });
  },
  deleteTag(context, tagId) {
    const result = confirm('Delete this ?');
    if (result) {
      context.commit('loading', null, { root: true });
      TagsService.deleteTag(tagId)
        .then((response) => {
          context.commit('notLoading', null, { root: true });
          context.commit({ type: 'deleteTag', tag: response.data });
        }).catch(error => {
          context.commit('notLoading', null, { root: true });
          alert(error.response.data);
        });
    }
  }
}

const getters = {
  inputForm: state => state.editingTag ? Object.assign({}, state.editingTag) : { text: "", type: "" }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
