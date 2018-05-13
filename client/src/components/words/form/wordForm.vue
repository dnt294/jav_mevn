<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "wordsModule"
);

const tagsModule = createNamespacedHelpers("tagsModule");

import { defaultWord, convertForms } from "@/models/word";

export default {
  name: "wordForm",
  data: () => ({
    input: defaultWord
  }),
  computed: {
    ...mapState(["editingWord"]),
    ...tagsModule.mapState(["tags"]),
    isVerb: function() {
      return (
        this.input &&
        this.input.tags &&
        this.input.tags.some(tag => tag.text === "Động từ")
      );
    }
  },
  created() {
    this.input = Object.assign(
      {},
      this.$store.getters["wordsModule/inputForm"]
    );
  },
  methods: {
    submit() {
      !!this.editingWord
        ? this.updateWord(this.input)
        : this.createWord(this.input);
    },
    ...mapMutations(["cancelForm"]),
    ...mapActions(["createWord", "updateWord"]),
    genVerbForms() {
      if (!this.input.hirakata || !this.isVerb || !this.input.verbType) {
        alert("Please input all required!");
        return;
      }
      [
        this.input.masuForm,
        this.input.teForm,
        this.input.taForm,
        this.input.naiForm
      ] = convertForms(this.input.hirakata, this.input.verbType);
    }
  }
};
</script>

<template src='./wordForm.html'>
