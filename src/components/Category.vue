<template>
  <h4 @click="setCurrentCategory(category.uuid)">
    {{ category.title }}
  </h4>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    category: Object,
  },
  methods: {
    ...mapActions(["updateCurrentCategory"]),

    setCurrentCategory(uuid) {
      this.updateCurrentCategory(uuid);
    },
  },
};
</script>

<style scoped>
h4:hover {
  color: red;
  cursor: pointer;
}
</style>