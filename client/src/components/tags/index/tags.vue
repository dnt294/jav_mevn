<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "tagsModule"
);
import tagForm from "../form/tagForm";

export default {
  name: "tags",
  created() {
    this.$store.dispatch("tagsModule/fetchTags");
  },
  computed: mapState(["tags", "isShowCreateForm", "editingTag"]),
  components: {
    tagForm
  },
  methods: {
    ...mapMutations(["newTag", "editTag"]),
    ...mapActions(["fetchTags", "deleteTag"])
  }
};
</script>

<template src='./tags.html'>
