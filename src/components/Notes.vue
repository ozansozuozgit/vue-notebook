<template>
  <div>
    <div class="notes_container" v-for="note in getNotes" :key="note.uuid">
      <Note :note="note" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Note from "./Note";

export default {
  name: "Notes",
  components: {
    Note,
  },
  computed: {
    ...mapGetters(["getNotes"]),
  },
};
</script>

<style lang="scss" scoped>
</style>