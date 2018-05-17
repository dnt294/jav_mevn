<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers("wordsModule/typesModule");

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
    ...mapState(["lessonsWithExpressionsAndAdverbs", "isLoadingElses"]),
    ...mapGetters(["totalExpressionsAndAdverbs"])
  },
  actions: {
    ...mapActions(["fetchExpressionsAndAdverbs"])
  }
};
</script>

<template src='./expressionsAndAdverbs.html'></template>

<style lang="scss" src='./expressionsAndAdverbs.scss'></style>
