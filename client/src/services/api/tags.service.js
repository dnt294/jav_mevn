import axios from 'axios';

export const TagsService = {
  getTags() {
    return axios.get('api/tags');
  },
  createTag(tag) {
    return axios.post(`api/tags`, tag);
  },
  updateTag(tagId, tag) {
    return axios.patch(`api/tags/${tagId}`, tag);
  },
  deleteTag(id) {
    return axios.delete(`api/tags/${id}`);
  },
}
