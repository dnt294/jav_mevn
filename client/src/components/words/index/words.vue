<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "wordsModule"
);

const lessonsModule = createNamespacedHelpers("lessonsModule");

import wordForm from "../form/wordForm";
import tagBadge from "@/components/share/tagBadge";

export default {
  name: "words",
  created() {
    this.$store.dispatch("tagsModule/fetchTags");
    this.$store.dispatch("wordsModule/fetchFirstWords");
  },
  computed: {
    ...mapState([
      "words",
      "isLoadingWords",
      "editingWord",
      "selectingLessonId"
    ]),
  },
  components: {
    wordForm,
    tagBadge
  },
  methods: {
    ...mapMutations(["editWord"]),
    ...mapActions(["deleteWord"])
  }
};
</script>

<template src='./words.html'></template>
