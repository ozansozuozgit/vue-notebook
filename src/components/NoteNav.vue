<template>
  <div>
    <button @click="handleClick">Add Note</button>
    <input type="text" v-model="noteTitle" />
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import db from "../firebase/init";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "NoteNav",
  props: { currentCategory: String },
  data: () => {
    return { noteTitle: "" };
  },
  methods: {
    ...mapActions(["addNotes"]),

    handleClick() {
      const title = this.noteTitle;
      const uuid = uuidv4();
      if (title === "") return;

      db.collection("notes")
        .add({
          title,
          uuid,
          categoryID: this.getCurrentCategory,
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
      this.addNotes({ title, uuid, category: this.getCurrentCategory });
      this.noteTitle = "";
    },
  },
  computed: {
    ...mapGetters(["getCurrentCategory"]),
  },
};
</script>

<style scoped>
input {
  border: 1px black solid;
}
</style>