<script>
import Vue from "vue";
import { AtomSpinner } from "epic-spinners";
import { mapState } from "vuex";
import vSelect from "vue-select";

import store from "@/store/store";

import Sidebar from "@/components/layout/sidebar/Sidebar";
import Header from "@/components/layout/header/Header";
import searchResults from "@/components/search/searchResults/searchResults";
import rightSidebar from "@/components/layout/rightSidebar/rightSidebar";

Vue.component("v-select", vSelect);

export default {
  name: "App",
  store,
  computed: mapState(["isLoading"]),
  created() {
    this.$store.dispatch("userCurrent");
  },
  components: {
    Sidebar,
    Header,
    rightSidebar,
    searchResults,
    AtomSpinner
  }
};
</script>

<style lang="scss" src='./App.scss'></style>

<template src="./App.html">
