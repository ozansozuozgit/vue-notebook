<template>
  <div>
    <button>Save</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TextFieldNav",
  computed: {
    ...mapActions(["getCurrentNote"]),
  },
};
</script>

<style lang="scss" scoped>
</style>