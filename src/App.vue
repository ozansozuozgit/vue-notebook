<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="space-around"
          ><Notes /> <TextField /></v-row></v-container
    ></v-main>
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
      localStorage.setItem("notes", JSON.stringify([]));
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
</style>