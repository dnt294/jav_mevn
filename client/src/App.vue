<script>
import Vue from "vue";
import { AtomSpinner } from "epic-spinners";
import { mapState } from "vuex";
import vSelect from "vue-select";

import store from "@/store/store";

import Sidebar from "@/components/layout/sidebar/Sidebar";
import Header from "@/components/layout/header/Header";

Vue.component("v-select", vSelect);

export default {
  name: "App",
  store,
  computed: mapState(["isLoading"]),
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
