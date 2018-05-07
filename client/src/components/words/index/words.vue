<script>
import axios from "axios";
import wordForm from "../form/wordForm";

export default {
  name: "words",
  data: () => ({
    isShowCreateForm: false,
    words: [],
    editingWord: null
  }),
  created() {
    axios.get("words").then(response => {
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
        axios.delete(`words/${word._id}`).then(response => {
          this.words.splice(
            this.words.findIndex(word => word._id === response.data._id),
            1
          );
        });
      }
    }
  }
};
</script>

<template src='./words.html'>
