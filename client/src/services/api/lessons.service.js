import axios from 'axios';

export const LessonsService = {
  getLessons() {
    return axios.get('api/lessons');
  },
  createLesson(lesson) {
    return axios.post(`api/lessons`, lesson);
  },
  updateLesson(lessonId, lesson) {
    return axios.patch(`api/lessons/${lessonId}`, lesson);
  },
  deleteLesson(id) {
    return axios.delete(`api/lessons/${id}`);
  },
}
