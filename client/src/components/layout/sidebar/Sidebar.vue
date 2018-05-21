<script>
import { mapActions } from "vuex";

export default {
  name: "Sidebar",
  data: () => ({
    searchKeyword: ""
  }),
  methods: {
    ...mapActions(["search"])
  }
};
</script>

<template src="./Sidebar.html">
