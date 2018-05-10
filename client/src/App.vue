<script>
import Vue from "vue";
import { AtomSpinner } from "epic-spinners";

import Sidebar from "@/components/layout/sidebar/Sidebar";
import Header from "@/components/layout/header/Header";

const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function() {
      return EventBus;
    }
  }
});

export default {
  name: "App",
  data: () => ({
    isLoading: false
  }),
  created() {
    this.$bus.$on("loading", $event => {
      this.isLoading = $event;
    });
  },
  components: {
    Sidebar,
    Header,
    AtomSpinner
  }
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import "../node_modules/admin-lte/dist/css/AdminLTE.min.css";
@import "../node_modules/admin-lte/dist/css/skins/_all-skins.css";

.spinner {
  position: absolute;
  top: 30%;
  left: 50%;
}
</style>

<template src="./App.html">
