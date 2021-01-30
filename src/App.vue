<template>
  <v-app>
    <Notes />
    <TextField />
  </v-app>
</template>

<script>
import TextField from "./components/TextField";
import Notes from "./components/Notes";
import dbService from "./services/db_service";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    Notes,
    TextField,
  },
  mounted() {
    const allNotes = dbService.getNotes();
    if (allNotes === null) {
      return;
    }
    this.addDbNotes(allNotes);
  },
  computed: {
    ...mapGetters(["getCurrentNote"]),
  },
  methods: {
    ...mapActions(["addDbNotes"]),
  },
};
</script>

<style scoped>
/* .app_container {
  display: flex;
  justify-content: space-evenly;
  height: 100vh;
  width: 88%;
  margin: auto;
  padding-top: 10px;
} */
</style>