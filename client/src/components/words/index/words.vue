<script>
import axios from "axios";
import wordForm from "../form/wordForm";

export default {
  name: "words",
  data: () => ({
    isShowCreateForm: false,
    lessons: [],
    selectingLessonId: null,
    words: [],
    editingWord: null
  }),
  created() {
    this.$bus.$emit("loading", true);
    axios
      .get("lessons")
      .then(response => {
        this.lessons = response.data;
        this.selectingLessonId = this.lessons[0]._id;
        return axios.get(`words?lessonId=${this.selectingLessonId}`);
      })
      .then(response => {
        this.$bus.$emit("loading", false);
        this.words = response.data;
      });
  },
  components: {
    wordForm
  },
  methods: {
    cancelForm() {
      this.isShowCreateForm = false;
      this.editingWord = null;
    },
    newWord() {
      this.isShowCreateForm = true;
    },
    wordCreated(word) {
      this.words.push(word);
      this.isShowCreateForm = false;
    },
    editWord(word) {
      this.editingWord = word;
    },
    wordUpdated(newWord, oldWord) {
      this.editingWord = null;
      Object.assign(oldWord, newWord);
    },
    deleteWord(word) {
      const result = confirm("Delete this ?");
      if (result) {
        this.$bus.$emit("loading", true);
        axios.delete(`words/${word._id}`).then(response => {
          this.$bus.$emit("loading", false);
          this.words.splice(
            this.words.findIndex(word => word._id === response.data._id),
            1
          );
        });
      }
    },
    changeLesson(lesson) {
      this.selectingLessonId = lesson._id;
      this.$bus.$emit("loading", true);
      axios.get(`words?lessonId=${this.selectingLessonId}`).then(response => {
        this.$bus.$emit("loading", false);
        this.words = response.data;
      });
    }
  }
};
</script>

<template src='./words.html'></template>

<style scoped src='./words.css'></style>
