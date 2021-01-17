<template>
  <div class="notes_container">
    <h2>Notes</h2>
    <div v-for="note in getNotes" :key="note.uuid">
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
.notes_container {
  flex: 0.25;

  h2 {
    margin-bottom: 10px;
  }
}
</style>