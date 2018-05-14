<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "wordsModule/verbsModule"
);

export default {
  name: "verbs",
  created() {
    this.$store.dispatch("wordsModule/verbsModule/fetchVerbs");
  },
  computed: {
    ...mapState(["lessonsWithVerbs"])
  },
  methods: {
    verbTypeClass: verb => {
      switch (verb.verbType) {
        case 1:
          return "word-type-1-cell";
        case 2:
          return "word-type-2-cell";
        default:
          return null;
      }
    },
    ...mapActions(["fetchVerbs"])
  }
};
</script>

<template src='./verbs.html'></template>

<style lang="scss" src='./verbs.scss'></style>
