import axios from 'axios';

export const LessonsService = {
  getLessons() {
    return axios.get('lessons');
  },
  createLesson(lesson) {
    return axios.post(`lessons`, lesson);
  },
  updateLesson(lessonId, lesson) {
    return axios.patch(`lessons/${lessonId}`, lesson);
  },
  deleteLesson(id) {
    return axios.delete(`lessons/${id}`);
  },
}

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
  }
}

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
