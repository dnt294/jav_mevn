<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "wordsModule/typesModule"
);

import tagBadge from "@/components/share/tagBadge";

export default {
  name: "expressionsAndAdverbs",
  created() {
    this.$store.dispatch("wordsModule/typesModule/fetchExpressionsAndAdverbs");
  },
  components: {
    tagBadge
  },
  computed: {
    ...mapState(["lessonsWithExpressionsAndAdverbs"])
  },
  actions: {
    ...mapActions(["fetchExpressionsAndAdverbs"])
  }
};
</script>

<template src='./expressionsAndAdverbs.html'></template>

<style lang="scss" src='./expressionsAndAdverbs.scss'></style>
