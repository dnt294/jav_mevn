<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "lessonsModule"
);

import lessonForm from "../form/lessonForm";

export default {
  name: "lessons",
  created() {
    this.$store.dispatch("lessonsModule/getLessons");
  },
  computed: mapState([
    "lessons",
    "isShowCreateForm",
    "editingLesson"
  ]),
  components: {
    lessonForm
  },
  methods: {
    ...mapMutations(["newLesson", "editLesson"]),
    ...mapActions(["deleteLesson"])
  }
};
</script>

<template src='./lessons.html'>
