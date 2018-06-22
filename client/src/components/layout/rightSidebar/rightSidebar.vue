<script>
import { createNamespacedHelpers } from "vuex";

const wordsModule = createNamespacedHelpers("wordsModule");
const lessonsModule = createNamespacedHelpers("lessonsModule");

export default {
  name: "rightSidebar",
  computed: {
    ...wordsModule.mapState([
      "selectingLessonId",
    ]),
    ...lessonsModule.mapState(["lessons", "isLoadingLessons"])
  },
  methods: {
    ...wordsModule.mapActions(["changeLesson"])
  }
}
</script>

<template src="./rightSidebar.html"></template>

<style scoped src='./rightSidebar.scss'></style>
