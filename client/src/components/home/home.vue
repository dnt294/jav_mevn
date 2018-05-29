<script>
import { createNamespacedHelpers } from "vuex";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  data: () => ({
    input: {
      username: "",
      password: ""
    }
  }),
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState(["currentUsername", "isAuthenticating"])
  },
  methods: {
    ...mapActions(["register", "login"])
  }
};
</script>

<template src='./home.html'>
