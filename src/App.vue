<template>
  <div class="app_container">
    <Categories />
    <Notes />
    <TextField />
  </div>
</template>

<script>
import TextField from "./components/TextField";
import Categories from "./components/Categories";
import Notes from "./components/Notes";
import dbService from "./services/db_service";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    Categories,
    Notes,
    TextField,
  },

  mounted() {
    const allCategories = dbService.getCategories();
    if (allCategories === null) return;
    this.addDbCategories(allCategories);
  },
  computed: {
    ...mapGetters(["getCategories", "getCurrentCategory", "getCurrentNote"]),
  },
  methods: {
    ...mapActions(["addDbCategories"]),
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