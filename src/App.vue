<template>
  <div class="app_container">
    <div class="category_container">
      <CategoryNav />
      <div
        class="categories_container"
        v-for="(category, index) in getCategories"
        :key="index"
      >
        <Category
          :category="category"
          @click.native="setCurrentCategory(category.uuid)"
        />
      </div>
    </div>
    <div class="note_container" v-if="currentCategory">
      <NoteNav :currentCategory="currentCategory" />
      <div class="notes_container" v-for="(note, index) in notes" :key="index">
        <Note :note="note" />
      </div>
    </div>
    <TextField v-if="currentCategory" />
  </div>
</template>

<script>
import TextField from "./components/TextField";
import CategoryNav from "./components/CategoryNav";
import Category from "./components/Category";
import Note from "./components/Note";
import NoteNav from "./components/NoteNav";

import db from "./firebase/init";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    CategoryNav,
    Category,
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
    ...mapGetters(["getCategories"]),
  },
  methods: {
    ...mapActions(["addCategory", "addDbCategories"]),
    setCurrentCategory(uuid) {
      console.log(uuid);
      this.currentCategory = uuid;

      // db.collection("categories")
      //   .where("uuid", "==", uuid)
      //   .get()
      //   .then(function (querySnapshot) {
      //     querySnapshot.forEach(function (doc) {
      //       console.log(doc.id);
      //       this.currentCategory = doc.id;

      //     });
      //   })
      //   .catch(function (error) {
      //     console.log("Error getting documents: ", error);
      //   });
    },
  },
};
</script>

<style scoped>
.app_container {
  display: flex;
  justify-content: space-evenly;
}
</style>