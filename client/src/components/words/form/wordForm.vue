<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "wordsModule"
);

const tagsModule = createNamespacedHelpers("tagsModule");

export default {
  name: "wordForm",
  data: () => ({
    input: {
      hirakata: "",
      kanji: "",
      imi: "",
      note: "",
      tags: null
    }
  }),
  computed: {
    ...mapState(["editingWord"]),
    ...tagsModule.mapState(["tags"])
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
    ...mapActions(["createWord", "updateWord"])
  }
};
</script>

<template src='./wordForm.html'>
