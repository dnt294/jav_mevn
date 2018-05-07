<script>
import axios from "axios";

export default {
  name: "wordForm",
  data: () => ({
    input: {
      hirakata: "",
      kanji: "",
      imi: "",
      note: ""
    }
  }),
  watch: {
    editingWord: function(val) {
      this.input = Object.assign({}, val);
    },
    selectingLessonId: function(val) {
      this.selectingLessonId = val;
    }
  },
  props: ["editingWord", "selectingLessonId"],
  created() {
    if (!!this.editingWord) {
      this.input = Object.assign({}, this.editingWord);
    }
  },
  methods: {
    submit() {
      !!this.editingWord ? this.updateWord() : this.createWord();
    },
    cancel() {
      this.$emit("cancelForm");
    },
    createWord() {
      axios
        .post("words", {
          hirakata: this.input.hirakata,
          kanji: this.input.kanji,
          imi: this.input.imi,
          note: this.input.note,
          lesson: this.selectingLessonId
        })
        .then(
          response => {
            this.$emit("wordCreated", response.data);
          },
          error => {
            alert(error.response.data);
          }
        );
    },
    updateWord() {
      axios
        .patch(`words/${this.editingWord._id}`, {
          hirakata: this.input.hirakata,
          kanji: this.input.kanji,
          imi: this.input.imi,
          note: this.input.note
        })
        .then(
          response => {
            this.$emit("wordUpdated", response.data, this.editingWord);
          },
          error => {
            alert(error.response.data);
          }
        );
    }
  }
};
</script>

<template src='./wordForm.html'>
