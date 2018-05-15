<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "lessonsModule"
);

export default {
  name: "lessonForm",
  data: () => ({
    input: {
      index: "",
      bookName: ""
    }
  }),
  computed: mapState(["editingLesson"]),
  mounted() {
    $(this.$el).on("show.bs.modal", this.show);
  },
  methods: {
    show() {
      this.input = Object.assign(
        {},
        this.$store.getters["lessonsModule/inputForm"]
      );
    },
    submit() {
      !!this.editingLesson
        ? this.updateLesson(this.input)
        : this.createLesson(this.input);
    },
    ...mapMutations(["cancelForm"]),
    ...mapActions(["createLesson", "updateLesson"])
  }
};
</script>

<template src='./lessonForm.html'>
