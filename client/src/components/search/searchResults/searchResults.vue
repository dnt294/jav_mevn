<script>
import { mapState } from "vuex";

import tagBadge from "@/components/share/tagBadge";

export default {
  name: "searchResults",
  components: {
    tagBadge
  },
  computed: mapState(["searchResults"])
};
</script>

<template src='./searchResults.html'>
