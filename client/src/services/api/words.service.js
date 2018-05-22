import axios from 'axios';

export const WordsService = {
  getWords(lessonId) {
    return axios.get(`api/words?lessonId=${lessonId}`);
  },
  createWord(word) {
    return axios.post(`api/words`, word);
  },
  updateWord(wordId, word) {
    return axios.patch(`api/words/${wordId}`, word);
  },
  deleteWord(id) {
    return axios.delete(`api/words/${id}`);
  },
  getVerbs() {
    return axios.get('api/words/verbs');
  },
  getSurus() {
    return axios.get('api/words/surus');
  },
  getAdjs() {
    return axios.get('api/words/adjs');
  },
  getElses() {
    return axios.get('api/words/elses');
  },
  search(keyword) {
    return axios.get(`api/words/search?keyword=${keyword}`);
  },
}
