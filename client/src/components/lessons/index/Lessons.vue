<script>
import axios from "axios";
import LessonForm from "../form/LessonForm";

export default {
  name: "Lessons",
  data: () => ({
    isShowCreateForm: false,
    lessons: [],
    editingLesson: null
  }),
  created() {
    axios.get("lessons").then(response => {
      this.lessons = response.data;
    });
  },
  components: {
    LessonForm
  },
  methods: {
    cancelForm() {
      this.isShowCreateForm = false;
      this.editingLesson = null;
    },
    newLesson() {
      this.isShowCreateForm = true;
    },
    lessonCreated(lesson) {
      this.lessons.push(lesson);
      this.isShowCreateForm = false;
    },
    editLesson(lesson) {
      this.editingLesson = lesson;
    },
    lessonUpdated(newLesson, oldLesson) {
      this.editingLesson = null;
      Object.assign(oldLesson, newLesson);
    },
    deleteLesson(lesson) {
      const result = confirm("Delete this ?");
      if (result) {
        axios.delete(`lessons/${lesson._id}`).then(response => {
          this.lessons.splice(
            this.lessons.findIndex(lesson => lesson._id === response.data._id),
            1
          );
        });
      }
    }
  }
};
</script>

<template src='./Lessons.html'>
