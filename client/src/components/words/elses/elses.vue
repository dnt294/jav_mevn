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
  name: "elses",
  created() {
    this.$store.dispatch("wordsModule/typesModule/fetchElses");
  },
  components: {
    tagBadge
  },
  computed: {
    ...mapState(["lessonsWithElses", "isLoadingElses"]),
    ...mapGetters(["totalElses"])
  },
  actions: {
    ...mapActions(["fetchElses"])
  }
};
</script>

<template src='./elses.html'></template>

<style lang="scss" src='./elses.scss'></style>
