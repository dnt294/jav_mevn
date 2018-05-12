<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "wordsModule"
);

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
  computed: mapState(["editingWord"]),
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
    ...mapActions(["createWord", "updateWord"])
  }
};
</script>

<template src='./wordForm.html'>
