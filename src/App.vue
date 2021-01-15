<template>
  <div class="app_container">
    <div class="category_container">
      <CategoryNav />
      <Categories />
    </div>
    <div class="note_container" v-if="getCurrentCategory">
      <NoteNav />
      <Notes />
    </div>
    <div class="textfield_container" v-if="getCurrentNote">
      <TextField />
    </div>
  </div>
</template>

<script>
import TextField from "./components/TextField";
import CategoryNav from "./components/CategoryNav";
import NoteNav from "./components/NoteNav";
import Categories from "./components/Categories";
import Notes from "./components/Notes";
import db from "./firebase/init";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    CategoryNav,
    Categories,
    NoteNav,
    Notes,
    TextField,
  },

  mounted() {
    db.collection("categories")
      .get()
      .then((snapshot) => {
        let dbCategories = snapshot.docs.map((doc) => doc.data());
        this.addDbCategories(dbCategories);
      })
      .catch((e) => {
        console.log(e);
      });
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
}
</style>