<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "tagsModule"
);
export default {
  name: "tagForm",
  data: () => ({
    input: {
      text: "",
      type: ""
    }
  }),
  computed: mapState(["editingTag"]),
  mounted() {
    $(this.$el).on("show.bs.modal", this.show);
  },
  methods: {
    show() {
      this.input = Object.assign(
        {},
        this.$store.getters["tagsModule/inputForm"]
      );
    },
    submit() {
      !!this.editingTag
        ? this.updateTag(this.input)
        : this.createTag(this.input);
    },
    ...mapMutations(["cancelForm"]),
    ...mapActions(["createTag", "updateTag"])
  }
};
</script>

<template src='./tagForm.html'>
