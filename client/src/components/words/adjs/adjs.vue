<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "wordsModule/typesModule"
);

export default {
  name: "Adjs",
  created() {
    this.$store.dispatch("wordsModule/typesModule/fetchAdjs");
  },
  computed: {
    ...mapState(["lessonsWithAdjs"])
  },
  methods: {
    ...mapActions(["fetchAdjs"])
  }
};
</script>

<template src='./adjs.html'></template>

<style lang="scss" src='./adjs.scss'></style>
