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
    ...lessonsModule.mapState(["lessons", "isLoadingLessons"])
  },
  components: {
    wordForm,
    tagBadge
  },
  methods: {
    ...mapMutations(["editWord"]),
    ...mapActions(["deleteWord", "changeLesson"])
  }
};
</script>

<template src='./words.html'></template>

<style scoped src='./words.scss'></style>
