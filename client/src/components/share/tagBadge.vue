<script>
const colorMap = {
  "Động từ": "badge bg-red",
  "Tính từ": "badge bg-yellow",
  Adverb: "badge bg-green",
  "Suru Verb": "badge bg-blue",
  Expression: "badge"
};

export default {
  name: "tagBadge",
  props: {
    type: String
  },
  computed: {
    classType() {
      return colorMap[this.type];
    }
  }
};
</script>

<template>
  <span v-bind:class="classType">{{type}}</span>
</template>

<style lang="scss" scoped>
span {
  padding: 8px;
  margin: 3px;
}
</style>
