<script>
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Header from '@/components/layout/header/Header';

export default {
  name: 'App',
  components: {
    Sidebar, Header,
  },
};
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import '../node_modules/admin-lte/dist/css/AdminLTE.min.css';
@import '../node_modules/admin-lte/dist/css/skins/_all-skins.css';
</style>

<template src="./App.html">
