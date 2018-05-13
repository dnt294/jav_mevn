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
    this.$store.dispatch("tagsModule/fetchTags");
    this.$store.dispatch("wordsModule/fetchFirstWords");
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
