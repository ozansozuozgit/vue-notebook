<template>
  <div class="app_container">
    <div class="category_container">
      <CategoryNav />
      <Categories />
    </div>
    <div class="note_container" v-if="getCurrentCategory">
      <NoteNav :currentCategory="currentCategory" />
      <div class="notes_container" v-for="(note, index) in notes" :key="index">
        <Note :note="note" />
      </div>
    </div>
    <TextField v-if="getCurrentCategory" />
  </div>
</template>

<script>
import TextField from "./components/TextField";
import CategoryNav from "./components/CategoryNav";
import Note from "./components/Note";
import NoteNav from "./components/NoteNav";
import Categories from "./components/Categories";

import db from "./firebase/init";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    CategoryNav,
    Categories,
    NoteNav,
    Note,
    TextField,
  },

  data: () => ({
    categories: null,
    notes: null,
    currentCategory: null,
  }),
  async mounted() {
    const snapshot = await db.collection("categories").get();
    let dbCategories = snapshot.docs.map((doc) => doc.data());
    this.addDbCategories(dbCategories);
  },
  computed: {
    ...mapGetters(["getCategories", "getCurrentCategory"]),
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