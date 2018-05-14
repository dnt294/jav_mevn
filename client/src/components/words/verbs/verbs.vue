<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "wordsModule/typesModule"
);

export default {
  name: "verbs",
  created() {
    this.$store.dispatch("wordsModule/typesModule/fetchVerbs");
  },
  computed: {
    ...mapState(["lessonsWithVerbs"])
  },
  methods: {
    verbTypeClass: word => {
      switch (word.verbType) {
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
