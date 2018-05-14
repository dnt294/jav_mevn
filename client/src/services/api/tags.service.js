import axios from 'axios';

export const TagsService = {
  getTags() {
    return axios.get('tags');
  },
  createTag(tag) {
    return axios.post(`tags`, tag);
  },
  updateTag(tagId, tag) {
    return axios.patch(`tags/${tagId}`, tag);
  },
  deleteTag(id) {
    return axios.delete(`tags/${id}`);
  },
}
