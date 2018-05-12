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
  created() {
    this.input = Object.assign({}, this.$store.getters["tagsModule/inputForm"]);
  },
  methods: {
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
