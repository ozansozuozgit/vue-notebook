<template>
  <div class="app_container">
    <Notes :notes='notes'/>
    <TextField />
  </div>
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
  data: () => {
    return { notes: [] };
  },
  mounted() {
    const allNotes = dbService.getNotes();
    if (allNotes === null) {
      return;
    }
    this.notes.push(allNotes);
  },
  computed: {
    ...mapGetters(["getCategories", "getCurrentCategory", "getCurrentNote"]),
  },
  methods: {
    ...mapActions(["addDbCategories", "setCurrentCategory", "addDbNotes"]),
  },
};
</script>

<style scoped>
.app_container {
  display: flex;
  justify-content: space-evenly;
  height: 100vh;
  width: 88%;
  margin: auto;
  padding-top: 10px;
}
</style>