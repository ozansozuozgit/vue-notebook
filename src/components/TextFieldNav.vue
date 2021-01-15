<template>
  <div>
    <button>Save</button>
  </div>
</template>

<script>
// import db from "../firebase/init";
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