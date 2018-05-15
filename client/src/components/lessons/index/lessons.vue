<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "lessonsModule"
);

import lessonForm from "../form/lessonForm";

export default {
  name: "lessons",
  created() {
    this.$store.dispatch("lessonsModule/fetchLessons");
  },
  computed: mapState(["lessons", "editingLesson"]),
  components: {
    lessonForm
  },
  methods: {
    ...mapMutations(["editLesson"]),
    ...mapActions(["fetchLessons", "deleteLesson"])
  }
};
</script>

<template src='./lessons.html'>
