<script>
import { mapState } from "vuex";
import tagForm from "../form/tagForm";
export default {
  name: "tags",
  created() {
    this.$store.dispatch("tagsModule/getTags");
  },
  computed: mapState("tagsModule", ["tags", "isShowCreateForm", "editingTag"]),
  components: {
    tagForm
  },
  methods: {
    ...mapMutations(["newTag", "editTag"]),
    ...mapActions(["deleteTag"])
  }
};
</script>

<template src='./tags.html'>
