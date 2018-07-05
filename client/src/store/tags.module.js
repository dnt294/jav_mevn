import { TagsService } from '@/services/api/tags.service';
import { popAlert } from '@/functions/alert';

const state = {
  tags: [],
  isLoadingTags: false,
  editingTag: null
};

const mutations = {
  setIsLoading(state, payload) {
    state.isLoadingTags = payload.isLoadingTags;
  },
  setTags(state, payload) {
    state.tags = payload.tags;
  },
  cancelForm(state) {
    state.editingTag = null;
  },
  editTag(state, payload) {
    state.editingTag = payload;
  },
  tagCreated(state, payload) {
    state.tags.push(payload.tag);
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
  fetchTags(context, refresh = false) {
    if (context.state.tags.length > 0 && !refresh) { return; }
    context.commit('setIsLoading', { isLoadingTags: true });

    return TagsService.getTags()
      .then(response => {
        context.commit({ type: 'setTags', tags: response.data });
        return response;
      }).catch(error => {
        popAlert(this, error);
        return Promise.reject(error);
      }).finally(() => context.commit('setIsLoading', { isLoadingTags: false }));
  },
  createTag(context, input) {
    context.commit('setIsLoading', { isLoadingTags: true });
    TagsService.createTag(input)
      .then(response => {
        context.commit({ type: 'tagCreated', tag: response.data });
        return response;
      }).catch(error => {
        popAlert(this, error);
        return Promise.reject(error);
      }).finally(() => context.commit('setIsLoading', { isLoadingTags: false }));
  },
  updateTag(context, input) {
    context.commit('setIsLoading', { isLoadingTags: true });
    const tagId = context.state.editingTag._id;

    TagsService.updateTag(tagId, input)
      .then(response => {
        context.commit({ type: 'tagUpdated', tag: response.data });
        return response;
      }).catch(error => {
        popAlert(this, error);
        return Promise.reject(error);
      }).finally(() => context.commit('setIsLoading', { isLoadingTags: false }));
  },
  deleteTag(context, tagId) {
    const result = confirm('Delete this ?');
    if (result) {
      context.commit('setIsLoading', { isLoadingTags: true });
      TagsService.deleteTag(tagId)
        .then((response) => {
          context.commit({ type: 'deleteTag', tag: response.data });
          return response;
        }).catch(error => {
          popAlert(this, error);
          return Promise.reject(error);
        }).finally(() => context.commit('setIsLoading', { isLoadingTags: false }));
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
