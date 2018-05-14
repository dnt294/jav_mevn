import axios from 'axios';

export const WordsService = {
  getWords(lessonId) {
    return axios.get(`words?lessonId=${lessonId}`);
  },
  createWord(word) {
    return axios.post(`words`, word);
  },
  updateWord(wordId, word) {
    return axios.patch(`words/${wordId}`, word);
  },
  deleteWord(id) {
    return axios.delete(`words/${id}`);
  },
  getVerbs() {
    return axios.get('words/verbs');
  },
  getSurus() {
    return axios.get('words/surus');
  },
  getAdjs() {
    return axios.get('words/adjs');
  },
}
