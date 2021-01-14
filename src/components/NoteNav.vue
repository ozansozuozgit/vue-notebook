<template>
  <div>
    <input type="text" v-model="noteTitle" />
    <button @click="addNote">Add Note</button>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import db from "../firebase/init";
export default {
  name: "NoteNav",
  props: { currentCategory: String },
  data: () => {
    return { noteTitle: "" };
  },
  methods: {
    addNote() {
      const title = this.noteTitle;
      console.log(title);
      if (title === "") return;
      db.collection("notes")
        .add({
          title: title,
          category: this.currentCategory,
          uuid: uuidv4(),
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
  },
};
</script>

<style scoped>
</style>