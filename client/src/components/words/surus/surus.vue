<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers("wordsModule/typesModule");

export default {
  name: "surus",
  created() {
    this.$store.dispatch("wordsModule/typesModule/fetchSurus");
  },
  computed: {
    ...mapState(["lessonsWithSurus", "isLoadingSurus"]),
    ...mapGetters(["totalSurus"])
  },
  methods: {
    ...mapActions(["fetchSurus"])
  }
};
</script>

<template src='./surus.html'></template>

<style lang="scss" src='./surus.scss'></style>
