<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "wordsModule"
);

const lessonsModule = createNamespacedHelpers("lessonsModule");

import wordForm from "../form/wordForm";

export default {
  name: "words",
  created() {
    this.$store.dispatch("tagsModule/getTags");
    this.$store.dispatch("wordsModule/fetchLessons");
  },
  computed: {
    ...mapState([
      "words",
      "isShowCreateForm",
      "editingWord",
      "selectingLessonId"
    ]),
    ...lessonsModule.mapState(["lessons"])
  },
  components: {
    wordForm
  },
  methods: {
    ...mapMutations(["newWord", "editWord"]),
    ...mapActions(["deleteWord", "changeLesson"])
  }
};
</script>

<template src='./words.html'></template>

<style scoped src='./words.scss'></style>
