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
