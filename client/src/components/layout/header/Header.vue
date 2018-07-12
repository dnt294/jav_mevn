<script>
import CountDown from "vuejs-count-down";

import { mapState, mapActions } from "vuex";

export default {
  name: "Header",
  components: {
    CountDown
  },
  computed: mapState("pingModule", ["timeLeft"]),
  methods: {
    countDownProgress(time) {
      this.$store.commit("pingModule/setTimeLeft", { timeLeft: time });
    },
    countDownFinished() {
      this.$store.dispatch("pingModule/ping");
      this.$refs.countdown.$emit("restart");
    }
  }
};
</script>

<template src="./Header.html"></template>

<style scoped src='./Header.scss'></style>
