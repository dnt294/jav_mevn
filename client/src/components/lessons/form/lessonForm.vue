<script>
import axios from "axios";

export default {
  name: "lessonForm",
  data: () => ({
    input: {
      index: "",
      bookName: ""
    }
  }),
  watch: {
    editingLesson: function(val) {
      this.input = Object.assign({}, val);
    }
  },
  props: ["editingLesson"],
  created() {
    if (!!this.editingLesson) {
      this.input = Object.assign({}, this.editingLesson);
    }
  },
  methods: {
    submit() {
      !!this.editingLesson ? this.updateLesson() : this.createLesson();
    },
    cancel() {
      this.$emit("cancelForm");
    },
    createLesson() {
      this.$bus.$emit("loading", true);
      axios
        .post("lessons", {
          index: this.input.index,
          bookName: this.input.bookName
        })
        .then(
          response => {
            this.$bus.$emit("loading", false);
            this.$emit("lessonCreated", response.data);
          },
          error => {
            this.$bus.$emit("loading", false);
            alert(error.response.data);
          }
        );
    },
    updateLesson() {
      this.$bus.$emit("loading", true);
      axios
        .patch(`lessons/${this.editingLesson._id}`, {
          index: this.input.index,
          bookName: this.input.bookName
        })
        .then(
          response => {
            this.$bus.$emit("loading", false);
            this.$emit("lessonUpdated", response.data, this.editingLesson);
          },
          error => {
            this.$bus.$emit("loading", false);
            alert(error.response.data);
          }
        );
    }
  }
};
</script>

<template src='./lessonForm.html'>
