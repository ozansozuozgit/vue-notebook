<template>
  <div class="app_container">
    <div class="category_container">
      <CategoryNav />
      <div
        class="categories_container"
        v-for="(category, index) in categories"
        :key="index"
      >
        <Category :category="category" />
      </div>
    </div>
    <div class="note_container">
      <div class="notes_container" v-for="(note, index) in notes" :key="index">
        <Note :note="note" />
      </div>
    </div>
    <TextField />
  </div>
</template>

<script>
import TextField from "./components/TextField";
import CategoryNav from "./components/CategoryNav";
import Category from "./components/Category";
import Note from "./components/Note";

export default {
  name: "App",

  components: {
    CategoryNav,
    Category,
    Note,
    TextField,
  },

  data: () => ({
    categories: ["Spirituality,Wisdom,Programming"],
    notes: ["note1", "note2", "note3"],
  }),
};
</script>

<style scoped>
.app_container {
  display: flex;
  justify-content: space-evenly;
}
</style>